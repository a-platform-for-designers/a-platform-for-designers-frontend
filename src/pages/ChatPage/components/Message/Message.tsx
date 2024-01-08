import { useAppSelector } from "@/hooks/reduxHooks";
import { IShortMessage } from "@/types";
import { Box, Typography, Paper } from "@mui/material";

interface MessageProps {
  message: IShortMessage;
  first: boolean;
}

const Message = ({ message, first }: MessageProps) => {
  
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

export default Message;
