import React from "react";
import { Form } from "react-bootstrap";
import "./ChatInput.scss";

const ChatInput = ({ value, onChange, handleKeyPress, className }: Prop) => {
  return (
    <>
      <Form.Control
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className={"chat-input fs-3 " + className}
        placeholder="Write a message..."
      />
    </>
  );
};

type Prop = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

export default React.memo(ChatInput);
