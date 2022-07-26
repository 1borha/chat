import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../../index";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(Context);

  const signIn = async () => {
    await auth.signIn(email, password);
  };

  return (
    <Modal.Dialog size="lg">
      <Modal.Header>
        <Modal.Title className="m-auto fs-2">Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 p-1" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We&#39;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5 p-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicButton">
            <Button
              variant="primary"
              type="button"
              size="lg"
              className="mx-auto mb-3 d-block"
              onClick={signIn}
            >
              Sign in
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
  );
});

export default React.memo(Login);
