import { FC } from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="text-center position-fixed top-50 start-50 translate-middle">
      <p>This page does not exist</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
};
