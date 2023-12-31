import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import { Button } from "@mui/material";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <p style={{ color: "white" }}> Sign In With Google To Continue </p>
      <Button
        variant="contained"
        size="large"
        color="success"
        onClick={signInWithGoogle}
      >
        Sign In
      </Button>
    </div>
  );
};
