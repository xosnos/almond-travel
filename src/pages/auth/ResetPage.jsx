import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  Container
} from 'react-bootstrap';

export const ResetPage = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error has occured: ", errorCode, errorMessage);
      });
  };
  return (
    <Container>
      <h1>Reset password</h1>
      Email:
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleReset}>Reset password</button>
    </Container>
  );
};