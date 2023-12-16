import { auth, db } from "../firebase-config.js";
import { signOut } from "firebase/auth";
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
import Cookies from "universal-cookie";
import { MatrixRainingLetters } from "react-mdr";
import MatrixRainComponent from "./MatrixRainComponent.jsx";

const cookies = new Cookies();

export const AppWrapper = ({
  children,
  isAuth,
  setIsAuth,
  setIsInChat,
  room,
  setRoom,
}) => {
  const keysRef = collection(db, "anahtar");
  console.log("room", room);

  const deleteKeys = async () => {
    const queryKeys = query(keysRef, where("room", "==", room));
    const deleteKeysFromFirebase = onSnapshot(queryKeys, (snapshot) => {
      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      deleteKeysFromFirebase();
    });
    // setRoom("")
  };

  const signUserOut = async () => {
    sessionStorage.clear();
    deleteKeys();
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <>
      <div>
        <MatrixRainComponent />
      </div>
      <div style={{ backgroundColor: "transparent" }}>
        <div style={{ backgroundColor: "transparent" }}>
          <h1>Welcome to Encrypted Chat App </h1>
        </div>

        <div>{children}</div>
        {isAuth && (
          <div>
            <button onClick={signUserOut}> Sign Out</button>
          </div>
        )}
      </div>
    </>
  );
};
