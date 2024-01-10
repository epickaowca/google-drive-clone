import { methods as firestore } from "./firestore";
import { methods as auth } from "./auth";

export * from "./types";
export const firebase = { firestore, auth };
