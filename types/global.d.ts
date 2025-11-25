import { MongoClient } from "mongodb";

declare global {
  // allow global `_mongoClientPromise` to be reused across hot reloads
  // in development without type errors
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};


