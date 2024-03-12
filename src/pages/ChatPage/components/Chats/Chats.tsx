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
import { getChats } from "@/redux/slices/chatSlice";
import { useEffect } from "react";

const Chats = () => {
  const { chats } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return (
    <List sx={{}}>
      {chats &&
        chats.map((chat) => {
          const { id, last_message, initiator, receiver } = chat;

          const partner = initiator.id === user?.id ? receiver : initiator;
          const { first_name, last_name, photo } = partner || {};

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
  );
};

export default Chats;
