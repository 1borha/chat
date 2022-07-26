import React, { FC, useCallback, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Context } from "../../index";
import { ChatMessageInterface } from "../../types/interfaces";
import "./ChatMessage.scss";

const ChatMessage: FC<ChatMessageInterface> = ({
  uid,
  nickname,
  content,
  date,
  id,
  time,
}) => {
  const auth = useContext(Context);
  const checkMe = useCallback(() => {
    return auth.uid === uid;
  }, []);

  return (
    <Container className={checkMe() ? "chat-message me" : "chat-message"}>
      <Row className="chat-message-nickname">{nickname}</Row>
      <Row className="chat-message-content text-break">{content}</Row>
      <Row className="chat-message-date justify-content-end">
        {date.slice(0, 8)}
      </Row>
    </Container>
  );
};

export default React.memo(ChatMessage);
