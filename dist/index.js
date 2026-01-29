import { createServer, IncomingMessage, ServerResponse } from "node:http";
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
//# sourceMappingURL=index.js.map