import { createServer, IncomingMessage } from "node:http";
import type { User } from "./models/User.js";

const hostName = "192.168.20.142";
const port = 9999;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Welcome to my http server");
});

server.listen(port, hostName, () => {
  console.log(`Server is running at http://${hostName}:${port}`);
});

// NOTE: Data structures
let nextId: number = 1;
const users: User[] = [
  { id: nextId++, name: "Harry Potter", email: "hp@gmail.com" },
  { id: nextId++, name: "Voldermolt", email: "v@gmail.com" },
];

// NOTE: Helper function: JSON --> Javascript Object (users)
function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (c) => {
      body += c;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}
