import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  StyledEngineProvider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./ChatPage.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getChats, getMessages, sendMessage } from "@/redux/slices/chatSlice";
import { IChat, IShortMessage } from "@/types";
import { EmptyData } from "../ProfilePage/components";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const dispatch = useAppDispatch();
  const { chats, messages } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  useEffect(() => {
    if (activeChat) {
      const { id } = activeChat;
      dispatch(getMessages(id));
    }
  }, [activeChat, dispatch]);

  const handleSend = () => {
    if (activeChat && input.trim() !== "") {
      dispatch(sendMessage(input.trim()));
      setInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const checkIsFirstMessage = (i: number, array: IShortMessage[]) => {
    if (i) {
      const currentMessageDate = new Date(array.at(i)!.pub_date).getDate();
      const previousMessageDate = new Date(array.at(i - 1)!.pub_date).getDate();
      return currentMessageDate !== previousMessageDate;
    } else {
      return true;
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#E6E4EC",
          height: "calc(100vh - 106px)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            height: "92%",
            maxWidth: "472px",
            minWidth: "400px",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            position: "relative",
            borderRight: "1px solid grey",
          }}
        >
          <Toolbar
            sx={{
              height: "84px",
            }}
          />
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "72%",
              "&::-webkit-scrollbar": {
                alignSelf: "stretch",
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                height: "212px",
                backgroundColor: "#98979A",
                outline: "1px solid slategrey",
                borderRadius: "100px",
              },
            }}
          >
            <List sx={{}}>
              {chats &&
                chats.map((chat) => {
                  const {
                    id,
                    last_message,
                    receiver: { first_name, last_name, photo },
                  } = chat;
                  return (
                    <ListItem key={id} disablePadding>
                      <ListItemButton onClick={() => setActiveChat(chat)}>
                        <Avatar src={photo}></Avatar>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "324px",
                            overflow: "hidden",
                            marginLeft: "16px",
                          }}
                        >
                          <ListItemText className="chats__list-name">
                            {`${first_name} ${last_name}`}
                          </ListItemText>
                          <ListItemText className="chats__list-text">
                            {last_message}
                          </ListItemText>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            height: "92%",
            width: "70%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              minHeight: "84px",
              borderBottom: "solid 1px grey",
              alignItems: "center",
            }}
          >
            <Avatar
              {...(activeChat ? { src: activeChat?.receiver.photo } : {})}
              sx={{
                marginLeft: "16px",
                marginRight: "20px",
              }}
            />
            <Typography
              sx={{
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "28px",
              }}
            >
              {activeChat &&
                `${activeChat?.receiver.first_name} ${activeChat?.receiver.last_name}`}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              p: 2,
              "&::-webkit-scrollbar": {
                alignSelf: "stretch",
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                height: "212px",
                backgroundColor: "#98979A",
                outline: "1px solid slategrey",
                borderRadius: "100px",
              },
            }}
          >
            {activeChat ? (
              messages.map((message, i, array) => (
                <Message
                  key={message.id}
                  message={message}
                  first={checkIsFirstMessage(i, array)}
                />
              ))
            ) : (
              <EmptyData
                title={chats?.length ? "Выберите чат" : "Пока здесь пусто"}
              ></EmptyData>
            )}
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              borderTop: "solid 1px grey",
              maxHeight: "225px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottomRightRadius: "12px",
              p: 2,
            }}
          >
            <Avatar {...(user ? { src: user.photo } : {})} />
            <TextField
              size="small"
              placeholder="Сообщение"
              value={input}
              onChange={handleInputChange}
              multiline
              maxRows={6}
              sx={{
                width: "566px",
                bgcolor: "#F6EDFF",
                margin: "0 20px 0",
                border: "none",
              }}
            />
            <Button
              sx={{
                minWidth: "40px",
                minHeight: "40px",
                width: "40px",
                height: "40px",
                paddingRight: "15px",
              }}
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
              disabled={input ? false : true}
            />
          </Box>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

const Message = ({
  message,
  first,
}: {
  message: IShortMessage;
  first: boolean;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const isCurrentUser = user?.id === message.sender_id;
  const dateObject = new Date(message.pub_date);
  const day =
    first &&
    dateObject.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
    });
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const time = `${hours}:${minutes}`;

  return (
    <Box sx={{}}>
      {day && (
        <Typography
          sx={{
            m: "26px",
            textAlign: "center",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "0.5px",
            color: "#6B6B6B",
          }}
        >
          {day}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isCurrentUser ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              ml: isCurrentUser ? 0 : 10,
              mr: isCurrentUser ? 10 : 0,
              backgroundColor: "#FAFAFA",
              borderRadius: "12px",
              padding: "10px",
              minWidth: "70px",
              maxWidth: "566px",
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
            <Typography
              sx={{
                textAlign: "right",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "16px",
                letterSpacing: "0.5px",
                color: "#6B6B6B",
              }}
            >
              {time}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
