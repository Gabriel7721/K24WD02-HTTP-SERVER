import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
const hostName = "192.168.20.142";
const port = 9999;
const server = createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    switch (`${req.method} ${req.url}`) {
        case "GET /":
            res.writeHead(200);
            res.end("Welcome to my http server!");
            break;
        case "GET /users":
            res.writeHead(200);
            res.end(JSON.stringify(users));
            break;
        case "POST /users":
            try {
                const data = await parseBody(req); // data === Object
                const newUser = {
                    id: nextId++,
                    name: data.name,
                    email: data.email,
                };
                users.push(newUser);
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            }
            catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
            break;
        case "GET /favicon.ico":
            const icon = await readFile("./public/favicon.ico");
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            res.end(icon);
            break;
        case "PUT /users":
            try {
                const data = await parseBody(req); // data === Object
                const newUser = {
                    id: nextId++,
                    name: data.name,
                    email: data.email,
                };
                users.push(newUser);
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            }
            catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
            break;
        default:
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Method not allowed" }));
            break;
    }
});
server.listen(port, hostName, () => {
    console.log(`Server is running at http://${hostName}:${port}`);
});
// NOTE: Data structures
let nextId = 1;
const users = [
    { id: nextId++, name: "Harry Potter", email: "hp@gmail.com" },
    { id: nextId++, name: "Voldermolt", email: "v@gmail.com" },
];
// NOTE: Helper function: JSON --> Javascript Object (users)
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (c) => {
            body += c;
        });
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
function getIdFromParam(path) {
    if (!path)
        return null;
    // localhost:9999/users/1 ---> ["localhost:9999","users","1"] --> lấy Number("1") = 1
    const parts = path.split("/");
    if (parts.length !== 3)
        return null;
    if (parts[1] !== "users")
        return null;
    const id = Number(parts[2]);
    return Number.isFinite(id) ? id : null;
}
function normalizeRoute(method, path) {
    const id = getIdFromParam(path);
    if (id !== null) {
        return `${method} /users/:id`;
    }
    return `${method} ${path}`;
}
//# sourceMappingURL=index.js.map