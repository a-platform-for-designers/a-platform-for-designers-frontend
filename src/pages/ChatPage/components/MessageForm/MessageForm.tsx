import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useState } from "react";
import { sendMessage } from "@/redux/slices/chatSlice";
import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Button,
} from "@mui/material";

const MessageForm = ()=> {
  const [input, setInput] = useState("");
  const { activeChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch()

  const handleSendMessage = () => {
    if (activeChat && input.trim() !== "") {
      dispatch(sendMessage(input.trim()));
      setInput("");
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };


  return (
    <>
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
              onClick={handleSendMessage}
              disabled={input ? false : true}
            />
    </>
  )
}

export default MessageForm;
