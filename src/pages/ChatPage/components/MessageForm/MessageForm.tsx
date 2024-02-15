import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachmentIcon from "@mui/icons-material/AttachFile";
import { chartsService } from "@/api";
import { sendMessage } from "@/redux/slices/chatSlice";
import { stripHost } from "@/features/stripHost";

const MessageForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { activeChat } = useAppSelector((state) => state.chat);
  const { receiver } = activeChat ?? {};
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // добавлен Ref для input

  const dispatch = useAppDispatch();

  const handleSendMessage = useCallback(async () => {
    if (input.trim() !== "") {
      dispatch(sendMessage({ message: input.trim() }));
      setInput("");
    }
  }, [input, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSendMessage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSendMessage]);

  const handleSendFile = async () => {
    if (selectedFile && activeChat) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("chat", String(activeChat?.id ?? 0));

      const { file } = (await chartsService.sendFile(formData)) || {};
      const url = stripHost(file);
      dispatch(
        sendMessage({ ...(input ? { message: input.trim() } : {}), file: url })
      );
      setSelectedFile(null);
      clearFileInput();
      setInput("");
      setOpen(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOpen(true);
    } else {
      console.error("Файл не выбран");
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    setOpen(false);
    clearFileInput();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAttachmentIconClick = () => {
    activeChat && fileInputRef.current?.click();
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
              style={{
                marginRight: "8px",
                color: "gray",
                cursor: "pointer",
                transform: "rotate(225deg)",
              }}
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

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: "24px" } }}
      >
        <DialogTitle style={{ padding: "32px 32px 20px" }}>
          <Box display="flex" alignItems="center" gap={"20px"}>
            <Avatar
              className="messagePopup__avatar"
              src={receiver?.photo}
              sx={{
                backgroundColor: "#4F378B",
                color: "#EADDFF",
              }}
              style={{ height: "52px", width: "52px" }}
            ></Avatar>
            <Typography component="h2" className="messagePopup__name">
              {receiver?.first_name}&nbsp;
              {receiver?.last_name}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 32,
              top: 32,
              backgroundColor: "#E3E3E4",
              color: "#FFF",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: "0 32px" }}>
          {selectedFile?.type.startsWith("image/") ? (
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
              alt="Загруженное изображение"
              style={{ maxWidth: "100%", borderRadius: 12 }}
            />
          ) : (
            selectedFile?.name
          )}

          <TextField
            size="small"
            placeholder="Сообщение"
            value={input}
            onChange={handleInputChange}
            multiline
            maxRows={6}
            sx={{
              width: "100%",
            }}
          />
        </DialogContent>
        <DialogActions style={{ padding: "20px 32px 32px" }}>
          <Button
            variant="contained"
            component="label"
            onClick={handleSendFile}
            sx={{
              width: "100%",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "24px",
            }}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageForm;
