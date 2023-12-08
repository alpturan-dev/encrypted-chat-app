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

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const keysRef = collection(db, "anahtar");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  // const deleteKeys = async () => {
  //   const queryKeys = query(
  //     keysRef,
  //     where("room", "==", "sefa"),
  //   );
  //   const deleteKeysFromFirebase = onSnapshot(queryKeys, (snapshot) => {
  //     snapshot.forEach(async (doc) => {
  //       await deleteDoc(doc.ref)
  //     });
  //     deleteKeysFromFirebase()
  //   });
  // }

  // if (!isInChat) {
  //   console.log("isInChat")
  //   sessionStorage.clear()
  //   deleteKeys();
  // }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input onChange={(e) => setRoom(e.target.value)} />
          <button
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
