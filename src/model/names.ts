import { Document, model, Schema } from "mongoose";

const name = "names";

export interface IName {
  name: string;
}
const schema = new Schema({
  name: { type: String, required: true },
});

export type NameDoc = IName & Document;
const NameModel = model<NameDoc>(name, schema);
export default NameModel;
