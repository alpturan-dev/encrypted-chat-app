import { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { keyGenerator } from '../utils/keyGenerator'
import { encryptWithRSA } from '../utils/encryptWithRSA'
import { decryptWithRSA } from '../utils/decryptWithRSA'
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const keysRef = collection(db, "anahtar");
  const [receiverPublicKey, setReceiverPublicKey] = useState("")

  const storeKeys = async (key) => {
    await addDoc(keysRef, {
      publicKey: key,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
  }

  const getKeys = async () => {
    const queryKeys = query(
      keysRef,
      where("room", "==", room),
      where("user", "!=", auth.currentUser.displayName)
    );
    const querySnapshot = await getDocs(queryKeys);
    querySnapshot.forEach((doc) => {
      setReceiverPublicKey(doc.data().publicKey)
      // console.log(doc.id, " => ", doc.data().publicKey);
    });
  }

  useEffect(() => {
    const keys = keyGenerator();
    sessionStorage.setItem("keys", JSON.stringify(keys));
    storeKeys(keys.publicKey);
    getKeys()
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      const privateKey = JSON.parse(sessionStorage.getItem('keys')).privateKey;
      messages.map((message) => {
        const decryptedText = decryptWithRSA(privateKey, message);
        console.log("decryptedText", decryptedText)
      })
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    getKeys()
    if (newMessage === "") return;
    const encryptedText = encryptWithRSA(receiverPublicKey, newMessage)
    await addDoc(messagesRef, {
      text: encryptedText,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {/* {messages.map((message) => {
          const privateKey = JSON.parse(sessionStorage.getItem('keys')).privateKey;
          const decryptedText = decryptWithRSA(privateKey, message);
          return (
            (
              <div key={message.id} className="message">
                <span className="user">{message.user}:</span> {decryptedText}
              </div>
            )
          )
        })} */}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
