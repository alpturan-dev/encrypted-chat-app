import { useState } from "react";
import { db, auth } from "./firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
import { Button, TextField } from "@mui/material";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const keysRef = collection(db, "anahtar");

  if (!isAuth) {
    return (
      <AppWrapper
        room={room}
        setRoom={setRoom}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
        isInChat={isInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper
      isAuth={isAuth}
      setIsAuth={setIsAuth}
      setIsInChat={setIsInChat}
      room={room}
      setRoom={setRoom}
      isInChat={isInChat}
    >
      {!isInChat ? (
        <div className="room" style={{ flex: 1, flexDirection: "row" }}>
          <TextField
            id="outlined-basic"
            label="Type Room Name"
            style={{ backgroundColor: "white", width: 500 }}
            variant="filled"
            color="success"
            onChange={(e) => setRoom(e.target.value)}
          />
          <Button
            variant="contained"
            size="medium"
            color="success"
            style={{ height: 56, borderRadius: 0 }}
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter Chat
          </Button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
