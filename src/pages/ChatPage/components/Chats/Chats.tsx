import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setActiveChat } from "@/redux/slices/chatSlice";
import { getChats, getMessages } from "@/redux/slices/chatSlice";
import { useEffect } from "react";

const Chats = ()=> {

  const { activeChat, chats } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  useEffect(() => {
    if (activeChat) {
      const { id } = activeChat;
      dispatch(getMessages(id));
    }
  }, [activeChat, dispatch]);

  return (
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
            <ListItemButton onClick={() => dispatch(setActiveChat(chat))}>
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
  )
}

export default Chats
