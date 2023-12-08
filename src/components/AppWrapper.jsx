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

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const keysRef = collection(db, "anahtar");

  const deleteKeys = async () => {
    const queryKeys = query(
      keysRef,
      where("room", "==", "sefa"),
    );
    const deleteKeysFromFirebase = onSnapshot(queryKeys, (snapshot) => {
      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      });
      deleteKeysFromFirebase()
    });
  }

  const signUserOut = async () => {
    sessionStorage.clear()
    deleteKeys();
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1> Chat App </h1>
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};
