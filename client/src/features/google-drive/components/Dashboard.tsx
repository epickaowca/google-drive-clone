import { FC } from "react";
import { Navbar } from "./Navbar";
import { Container } from "react-bootstrap";

export const Dashboard: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container />
    </>
  );
};
