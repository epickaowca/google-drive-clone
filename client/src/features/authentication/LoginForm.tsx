import { FC, useEffect, useState } from "react";
import { Form, Container, Image, Row, Col, Button } from "react-bootstrap";
import personal_email_illustration from "./assets/personal_email.png";
import { singIn } from "./services/singIn";
import { useAsyncFn } from "../../hooks/useAsync";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const { execute, error, loading, resData } = useAsyncFn(singIn);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({ email });
  };

  useEffect(
    function onSuccess() {
      if (!!resData) {
        localStorage.setItem("email", email);
      }
    },
    [resData]
  );

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-center flex-wrap-reverse">
        <Col
          className="p-0 d-none d-lg-block"
          style={{ maxWidth: "600px", minWidth: "470px" }}
        >
          <Image src={personal_email_illustration} fluid />
        </Col>
        <Col className="p-0" style={{ maxWidth: "600px", minWidth: "470px" }}>
          <div style={{ maxWidth: "250px" }}>
            <Form
              onSubmit={submitHandler}
              className="m-auto m-lg-0 flex-column gap-2 d-flex"
            >
              <Form.Label className="m-0">Email address</Form.Label>
              <Form.Control
                required
                autoFocus
                disabled={loading || !!resData}
                className="m-0"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Button
                disabled={loading || !!resData}
                type="submit"
                variant="outline-primary"
                className="mt-3"
              >
                Continue
              </Button>
            </Form>
            {!!resData && (
              <p className="mt-3">
                We send You an link, please check Your email
              </p>
            )}
            {error && (
              <p className="mt-3">
                something wrong, please try again in a few minutes
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
