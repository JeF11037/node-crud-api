import { createServer } from 'node:http';
import { statuses, getDataAsJSON } from './utils/';
import { User, UserController, User_data } from './db';

const user_controller = new UserController();

function getResponse(
    status_code: number, 
    status_message: string,
    result: any):string
{
    return JSON.stringify({
        code: status_code,
        message: status_message,
        result: JSON.parse(JSON.stringify(result))
    });
}

const server = createServer(async (req, res) => {
    if (req.url === "/api/users" && req.method === "GET") 
    {
        try
        {
            const users = await user_controller.getUsers() as Array<User>;
            let users_stringify_array: Array<string> = [];
            users.forEach(element => {
                users_stringify_array.push(JSON.stringify(element))
            });
            const result = JSON.parse(`[${users_stringify_array.join(',')}]`);
            const success_code = 200;
            res.writeHead(success_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    success_code,
                    statuses[success_code],
                    result
                )
            );
            res.end();
        }
        catch
        {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    500,
                    statuses[500],
                    null
                )
            );
            res.end();
        }
    }
    else if (req.url?.match(/\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) && req.method === "GET") 
    {
        try
        {
            const user_id = req.url.split("/")[3];
            const success_code = 200;
            const result = await user_controller.getUser(user_id);
            res.writeHead(success_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    success_code,
                    statuses[success_code],
                    result
                )
            );
            res.end();
        }
        catch (error: unknown)
        {
            const error_code: number = error as number || 500;
            let message: string = "";
            if (error_code === 400)
                message = statuses[400];
            else
                message = statuses[500];
            res.writeHead(error_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    error_code,
                    message,
                    null
                )
            );
            res.end();
        }
    }
    else if (req.url === "/api/users" && req.method === "POST") 
    {
        try
        {
            const user_data = await getDataAsJSON(req) as User_data || null;
            if (user_data === null)
                throw new Error();
            const result = await user_controller.createUser(user_data);
            const success_code = 201;
            res.writeHead(success_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    success_code,
                    statuses[success_code],
                    result
                )
            );
            res.end();
        }
        catch (error)
        {
            const error_code: number = error as number || 500;
            let message: string = "";
            if (error_code === 400)
                message = statuses[400];
            else
                message = statuses[500];
            res.writeHead(error_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    error_code,
                    message,
                    null
                )
            );
            res.end();
        }
    }
    else if (req.url?.match(/\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) && req.method === "PUT") 
    {
        try
        {
            const user_id = req.url.split("/")[3];
            const user_data = await getDataAsJSON(req) as User_data || null;
            if (user_data === null)
                throw new Error();
            const result = await user_controller.updateUser(user_id, user_data);
            const success_code = 200;
            res.writeHead(success_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    success_code,
                    statuses[success_code],
                    result
                )
            );
            res.end();
        }
        catch (error)
        {
            const error_code: number = error as number || 500;
            let message: string = "";
            if (error_code === 400)
                message = statuses[400];
            else
                message = statuses[500];
            res.writeHead(error_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    error_code,
                    message,
                    null
                )
            );
            res.end();
        }
    }
    else if (req.url?.match(/\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) && req.method === "DELETE") 
    {
        try
        {
            const user_id = req.url.split("/")[3];
            await user_controller.deleteUser(user_id);
            const success_code = 204;
            res.writeHead(success_code, { "Content-Type": "application/json" });
            res.end();
        }
        catch (error)
        {
            const error_code: number = error as number || 500;
            let message: string = "";
            if (error_code === 400)
                message = statuses[400];
            else
                message = statuses[500];
            res.writeHead(error_code, { "Content-Type": "application/json" });
            res.write(
                getResponse(
                    error_code,
                    message,
                    null
                )
            );
            res.end();
        }
    }
    else 
    {
        const status_code = 404;
        res.writeHead(status_code, { "Content-Type": "application/json" });
        res.end(JSON.stringify(
            { 
                code: status_code,
                message: statuses[status_code]
            }
        ));
    }
});

export default server;