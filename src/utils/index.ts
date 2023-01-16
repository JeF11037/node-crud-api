import { IncomingMessage } from "node:http";

function getDataAsJSON(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        try 
        {
            const chunks = new Array<Uint8Array>;
            req.on("data", (chunk) => {
                chunks.push(chunk);
            });
            req.on("end", () => {
                resolve(JSON.parse(Buffer.concat(chunks).toString()));
            });
        } 
        catch
        {
            reject(400);
        }
    });
}

const statuses = {
    200: "Success",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    404: "Not Found",
    500: "Internal Server Error"
}

export 
{ 
    getDataAsJSON,
    statuses
}