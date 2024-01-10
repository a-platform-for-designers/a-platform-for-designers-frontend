import {
  Box,
  Typography,
  Avatar,
  Toolbar,
  StyledEngineProvider,
} from "@mui/material";
import "./ChatPage.scss";
import { useAppSelector } from "@/hooks/reduxHooks";
import { EmptyData } from "../ProfilePage/components";
import Chats from "./components/Chats/Chats";
import Messages from "./components/Messages/Messages";
import MessageForm from "./components/MessageForm/MessageForm";

const ChatPage = () => {
  const { chats, activeChat } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.user);

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
            <Chats />
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
          {activeChat ? (
            <Messages />
          ) : (
            <Box flex={1} overflow="auto">
              <EmptyData
                title={chats?.length ? "Выберите чат" : "Пока здесь пусто"}
              ></EmptyData>
            </Box>
          )}
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
            <MessageForm />
          </Box>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default ChatPage;
