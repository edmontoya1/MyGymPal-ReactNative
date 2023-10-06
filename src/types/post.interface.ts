import { Timestamp } from "firebase/firestore";

export interface IPost {
  token: string;
  username: string;
  profileImg: string;
  timestamp: string;
  image: string;
}
