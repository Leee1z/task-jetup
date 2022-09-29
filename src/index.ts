import { connect } from "mongoose";
import NameModel from "./model/names";
import { Parser } from "./parser";
import express, { Express, Request, Response } from "express";

async function Connect() {
  try {
    await connect("mongodb://127.0.0.1:27017/app");
    console.log("[DB] => CONNECTED MONGO");
    const result = await NameModel.deleteMany();
    console.log(`Cleared ${result.deletedCount} old documents`);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  await Connect();
  const parser = new Parser("https://jetup.digital/team");
  const names = (await parser.names).map((name) => {
    return { name: name };
  });
  const result = await NameModel.create(names);
  console.log(`Created: ${result.length} documents`);
  await server();
}

async function server() {
  const app: Express = express();
  const port = 3000;
  const names = await NameModel.find();

  app.get("/api/users", (_req: Request, res: Response) => {
    res.send(`Names: ${names.map((doc) => doc.name).join("; ")}`);
  });

  app.listen(port, () => {
    console.log(`[SERVER]: Server is running`);
  });
}

main();
