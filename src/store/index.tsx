import { makeAutoObservable } from "mobx";
import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  getAuth,
  signOut,
  User,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  ChatMessageInterface,
  ChatMessagesInterface,
} from "../types/interfaces";

/**
 * @param {string} email
 * @param {string} password
 */
export class AuthStore {
  auth: Auth;
  firestore: Firestore;
  uid: string = "";
  email: string = "";
  password: string = "";
  nickname: string = "";
  isAuth: User | null = null;

  private app = initializeApp({
    apiKey: "AIzaSyDdkMwbO9yCsIafhA-lidVnCl-jQ0ncGMI",
    authDomain: "react-chat-typescript.firebaseapp.com",
    projectId: "react-chat-typescript",
    storageBucket: "react-chat-typescript.appspot.com",
    messagingSenderId: "976873736641",
    appId: "1:976873736641:web:390691a08bbd14fed60740",
  });

  /** Auth constructor. */
  constructor() {
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    makeAutoObservable(this);
  }

  public signIn = async (email: string, password: string) => {
    this.email = email;
    this.password = password;
    this.nickname = this.email.split("@")[0];
    try {
      const fetchEmailInfo = await fetchSignInMethodsForEmail(this.auth, email);
      if (fetchEmailInfo[0] === undefined) {
        this.register(email, password);
      } else if (fetchEmailInfo[0] === "password") {
        this.login(email, password);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  public signOut = async () => {
    try {
      await signOut(this.auth);
      this.email = "";
      this.password = "";
      this.nickname = "";
      this.uid = "";
      this.isAuth = this.auth.currentUser;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @param {string} content
   */
  public pushMessageToDB = async (content: string) => {
    try {
      await addDoc(collection(this.firestore, "messages"), {
        uid: this.uid,
        nickname: this.nickname,
        content,
        id: uuidv4(),
        time: Date.now(),
        date: DateTime.now().toFormat("HH':'mm':'ss '|' dd'.'LL'.'yyyy"),
      });
    } catch (err) {
      console.log(err);
    }
  };

  public getMessages = async () => {
    const messages: Array<ChatMessageInterface> = [];
    (await this.fetchMessages()).forEach((message) => {
      messages.push(message as ChatMessageInterface);
    });
    return { messages } as ChatMessagesInterface;
  };

  private getUID = async () => {
    const UID = await getAuth(this.app).currentUser?.uid;
    return UID;
  };

  private login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(this.auth, email, password);
    this.getUID().then((uid) => {
      this.uid = uid ? uid : "";
    });
    this.isAuth = this.auth.currentUser;
  };

  private register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(this.auth, email, password);
    this.getUID().then((uid) => {
      this.uid = uid ? uid : "";
    });
    this.isAuth = this.auth.currentUser;
  };

  private fetchMessages = async () => {
    const snapshot = await (
      await getDocs(collection(this.firestore, "messages"))
    ).docs.map((doc) => doc.data());
    return snapshot;
  };
}
