import "server-only";
import { MongoClient, type ObjectId } from "mongodb";

export type AdminUser = {
  _id: ObjectId;
  username: string;
  usernameNormalized: string;
  passwordHash: string;
  email?: string;
  name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
  emailVerifiedAt?: Date;
  sessionVersion?: number;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const globalMongo = globalThis as typeof globalThis & { mongoClientPromise?: Promise<MongoClient> };

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MongoDB is not configured.");
  if (!globalMongo.mongoClientPromise) {
    globalMongo.mongoClientPromise = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect().catch(error => {
      globalMongo.mongoClientPromise = undefined;
      throw error;
    });
  }
  return (await globalMongo.mongoClientPromise).db(process.env.MONGODB_DB || "Harsh");
}

export async function getUsers() {
  return (await getDatabase()).collection<AdminUser>("user");
}
