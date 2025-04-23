import mongoose, { Schema, Document } from "mongoose";

// Definir la interfaz del esquema
export interface IBusiness extends Document {
  id: number;
  distance: number;
  name: string;
  images: string[];
  email: string;
  phone: string;
  description: string;
  sectors: string[];
  job: string;
  latitude: string;
  longitude: string;
  city: string;
  country: string;
  web: string;
  online: boolean;
  owner: string;
  discount: number;
  wallet:string;
}




//Definir schema
const BusinessSchema = new Schema<IBusiness>({
  id: Number,
  distance: Number,
  name: String,
  images: [String],
  email: String,
  phone: String,
  description: String,
  sectors: [String],
  job: String,
  latitude: String,
  longitude: String,
  city: String,
  country: String,
  web: String,
  online: Boolean,
  owner: String,
  wallet:String,
  discount: { type: Number, default: 0 }
});

const Business = mongoose.model<IBusiness>("Business", BusinessSchema, "business");
export default Business;
