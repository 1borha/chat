import React, { FC, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { ChatMessagesInterface } from "../../types/interfaces";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatDisplay.scss";

const ChatDisplay: FC<ChatMessagesInterface> = ({ messages }) => {
  const [userScroll, setUserScroll] = useState(false);
  const messagesEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observerCallback = function (entries: any) {
      if (entries[0].isIntersecting) {
        setUserScroll(false);
      }
    };
    const observer = new IntersectionObserver(observerCallback);
    observer.observe(messagesEndRef.current as Element);
  }, [userScroll]);

  const scrollToBottom = () => {
    if (!userScroll) {
      messagesEndRef.current?.scrollIntoView({
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container
      className="chat-display overflow-auto"
      onWheel={() => setUserScroll(true)}
    >
      {messages.map(
        (message) =>
          message.uid && (
            <ChatMessage
              uid={message.uid}
              nickname={message.nickname}
              content={message.content}
              date={message.date}
              time={message.time}
              id={message.id}
              key={message.id}
            />
          )
      )}
      <div ref={messagesEndRef} />
    </Container>
  );
};

export default React.memo(ChatDisplay);
