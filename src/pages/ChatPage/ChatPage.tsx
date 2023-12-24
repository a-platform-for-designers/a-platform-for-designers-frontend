import * as React from "react";
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

const messages = [
  {
    id: 1,
    text: "Добрый день, Меня зовут Ваше имя, и я представляю компанию Название вашей компании. Недавно я ознакомился с вашим портфолио, и я впечатлён вашим уровнем мастерства и креативным подходом к UX/UI дизайну. Ваши работы демонстрируют глубокое понимание пользовательского опыта и внимание к деталям, что является ключевыми качествами для нас.",
    sender: "bot",
    time: "13:37",
    day: "3 сентября",
  },
  {
    id: 2,
    text: "Добрый день, Меня зовут Ваше имя ",
    sender: "user",
    time: "13:37",
    day: "",
  },
  {
    id: 3,
    text: "Добрый день, Меня зовут Ваше имя ",
    sender: "bot",
    time: "13:37",
    day: "",
  },
  {
    id: 4,
    text: "Добрый день, Меня зовут Ваше имя, и я представляю компанию Название вашей компании. Недавно я ознакомился с вашим портфолио, и я впечатлён вашим уровнем мастерства и креативным подходом к UX/UI дизайну. Ваши работы демонстрируют глубокое понимание пользовательского опыта и внимание к деталям, что является ключевыми качествами для нас.",
    sender: "bot",
    time: "13:37",
    day: "3 сентября",
  },
  {
    id: 5,
    text: "Добрый день, Меня зовут Ваше имя ",
    sender: "user",
    time: "13:37",
    day: "",
  },
  {
    id: 6,
    text: "Добрый день, Меня зовут Ваше имя ",
    sender: "bot",
    time: "13:37",
    day: "",
  },
  {
    id: 7,
    text: "Добрый день, Меня зовут Ваше имя, и я представляю компанию Название вашей компании. Недавно я ознакомился с вашим портфолио, и я впечатлён вашим уровнем мастерства и креативным подходом к UX/UI дизайну. Ваши работы демонстрируют глубокое понимание пользовательского опыта и внимание к деталям, что является ключевыми качествами для нас.",
    sender: "bot",
    time: "13:37",
    day: "3 сентября",
  },
  {
    id: 8,
    text: "Добрый день, Меня зовут Ваше имя ",
    sender: "user",
    time: "13:37",
    day: "",
  },
  {
    id: 9,
    text: "Добрый день, Меня зовут Ваше имя ",
    sender: "bot",
    time: "13:37",
    day: "",
  },
];

const interlocutors = [
  {
    id: 1,
    text: "Добрый день, пишу вам по поводу Добрый день, пишу вам по поводу",
    name: "Имя Фамилия",
  },
  { id: 2, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 3, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 4, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 5, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 6, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 7, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 8, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 9, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 10, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 11, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 12, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
  { id: 13, text: "Добрый день, пишу вам по поводу", name: "Имя Фамилия" },
];

interface MessageProps {
  message: {
    sender: string;
    text: string;
    time: string;
    day?: string;
  };
}

const ChatPage = () => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
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
              {interlocutors.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton>
                    <Avatar></Avatar>
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
                        {item.name}
                      </ListItemText>
                      <ListItemText className="chats__list-text">
                        {item.text}
                      </ListItemText>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
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
              Имя Фамилия
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
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
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
            <Avatar />
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

const Message = ({ message }: MessageProps) => {
  const isBot = message.sender === "bot";

  return (
    <Box sx={{}}>
      {message.day && (
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
          {message.day}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: isBot ? "flex-start" : "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isBot ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              ml: isBot ? 10 : 0,
              mr: isBot ? 0 : 10,
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
              {message.time}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
