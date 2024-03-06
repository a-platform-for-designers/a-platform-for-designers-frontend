import { stripHost } from "@/features/stripHost";
import { useAppSelector } from "@/hooks/reduxHooks";
import { IMessage } from "@/types";
import { Box, Typography, Paper } from "@mui/material";

interface MessageProps {
  message: IMessage;
  first: boolean;
}

const Message = ({ message, first }: MessageProps) => {
  const { user } = useAppSelector((state) => state.user);
  const isCurrentUser = user?.id === message.sender.id;
  const dateObject = new Date(message.pub_date);
  const day =
    first &&
    dateObject.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
    });
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const imageExtensionRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  const isImageMessage =
    message?.file && imageExtensionRegex.test(message.file);

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
            {isImageMessage && (
              <img
                src={stripHost(message.file)}
                alt="Картинка"
                style={{ maxWidth: "100%" }}
              />
            )}
            <Typography variant="body1" style={{ wordWrap: "break-word" }}>
              {message.text}
            </Typography>

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

export default Message;
