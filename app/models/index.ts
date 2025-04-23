import mongoose from "mongoose";
import dbConfig from "../db";
import Business from "./business.model";


interface IDatabase {
  mongoose: typeof mongoose;
  url: string;
  business: typeof Business;
}

const db: IDatabase = {
  mongoose,
  url: dbConfig.url,
  business: Business, 
};

export default db;
