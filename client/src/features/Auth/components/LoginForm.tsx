import { FC, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { sendEmail } from "../services/singIn";
import { useAsyncFn } from "../../../hooks/useAsync";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const { execute, error, loading, resData } = useAsyncFn(sendEmail);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({ email }).then(() => {
      localStorage.setItem("email", email);
    });
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-center flex-wrap-reverse">
        <Col className="p-0" style={{ maxWidth: "600px" }}>
          <div className="m-auto">
            <h1 className="text-center text-info mb-4">Login Account</h1>
            <p
              style={{ marginBottom: "70px" }}
              className="text-center text-secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              placerat tortor vel purus feugiat maximus. Nullam quis ligula
              condimentum, mattis turpis ut, dapibus nibh. Nam dictum lacus nec
              nisl tincidunt, non varius quam rutrum.
            </p>
            <Form
              style={{ maxWidth: "280px" }}
              onSubmit={submitHandler}
              className="m-auto flex-column gap-2 d-flex"
            >
              <Form.Control
                size="lg"
                required
                autoFocus
                disabled={loading || !!resData}
                className="m-0 border-primary"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Button
                size="lg"
                disabled={loading || !!resData}
                type="submit"
                variant="outline-primary"
                className="mt-3"
              >
                Continue
              </Button>
            </Form>
            {!!resData && (
              <p className="mt-3 text-center">
                We send You an link, please check Your email
              </p>
            )}
            {error && (
              <p className="mt-3 text-center">
                something wrong, please try again in a few minutes
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
