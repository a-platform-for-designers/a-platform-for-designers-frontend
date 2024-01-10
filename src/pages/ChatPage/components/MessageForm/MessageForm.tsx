import { ChangeEvent, useRef, useState } from "react";
//import { addMessage, sendMessage } from "@/redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { chartsService } from "@/api";
import { sendMessage } from "@/redux/slices/chatSlice";

const MessageForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { activeChat } = useAppSelector((state) => state.chat);
  //const { user } = useAppSelector((state) => state.user);
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // добавлен Ref для input

  const dispatch = useAppDispatch();

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      /** если не рабтает отправка сообщения через сокет
      const receiver =
        activeChat?.receiver.id === user?.id
          ? activeChat?.initiator.id
          : activeChat?.receiver.id;
      if (receiver) {
        const response = await chartsService.sendMessage({
          receiver,
          text: input.trim(),
        });
        setInput("");
        dispatch(addMessage(response));
      }
      */
      dispatch(sendMessage({ message: input.trim() }));
      setInput("");
    }
  };

  const handleSendFile = async () => {
    if (selectedFile && activeChat) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("chat", String(activeChat?.id ?? 0));

      const { file } = (await chartsService.sendFile(formData)) || {};
      dispatch(sendMessage({ message: selectedFile.name, file }));
      setSelectedFile(null);
      setOpen(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("file", file);
    if (file) {
      setSelectedFile(file);
      setOpen(true);
    } else {
      console.error("Файл не выбран");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAttachmentIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        hidden
        onChange={handleFileChange}
        ref={fileInputRef}
      />
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
        InputProps={{
          startAdornment: (
            <AttachmentIcon
              onClick={handleAttachmentIconClick}
              style={{ marginRight: "8px", color: "gray", cursor: "pointer" }}
            />
          ),
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Просмотр изображения
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedFile?.type.startsWith("image/") ? (
              <img
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) : undefined
                }
                alt="Загруженное изображение"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              selectedFile?.name
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            component="label"
            onClick={handleSendFile}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageForm;
