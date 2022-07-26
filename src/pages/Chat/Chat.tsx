import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Context } from "../../index";
import ChatInput from "../../components/UI/ChatInput/ChatInput";
import "./Chat.scss";
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import {
  ChatMessagesInterface,
  ChatMessageInterface,
} from "../../types/interfaces";
import { collection, onSnapshot } from "firebase/firestore";

const Chat = observer(() => {
  const auth = useContext(Context);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagesInterface>({
    messages: [
      {
        uid: "",
        nickname: "1",
        content: "1",
        date: "25.03.1010",
        id: "1",
      } as ChatMessageInterface,
    ],
  });
  const [cooldown, setCooldown] = useState<boolean>(false);

  const colectionsReference = collection(auth.firestore, "messages");

  useEffect(() => {
    const observer = onSnapshot(colectionsReference, (col) => {
      let arr: ChatMessageInterface[] = [];
      col.forEach((d) => {
        arr.push(d.data() as ChatMessageInterface);
      });
      arr = arr.sort((i1, i2) => {
        return i1.time - i2.time > 0 ? 1 : -1;
      });
      const messages = { messages: arr } as ChatMessagesInterface;
      setMessages(messages);
    });

    return () => observer();
  }, []);

  const sendMessage = () => {
    if (!cooldown) {
      setCooldown(true);
      auth.pushMessageToDB(message);
      setMessage("");
      setTimeout(() => {
        setCooldown(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>React-Chat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="flex-grow-0" id="basic-navbar-nav">
            <Nav>
              <Nav.Link onClick={auth.signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="chat">
        <Row className="chat__display">
          <Col sm={12}>
            <ChatDisplay messages={messages.messages} />
          </Col>
        </Row>
        <Row className="chat__input d-flex justify-content-between">
          <ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            handleKeyPress={handleKeyPress}
          />
          <Button
            className="chat__input__send-button fs-3"
            disabled={cooldown}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Row>
      </Container>
    </>
  );
});

export default React.memo(Chat);
