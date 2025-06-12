import { Request, Response } from "express";
import Client from "../models/Client.model";


export const createClient = async (req: Request, res: Response) => {
    const client = new Client(req.body);
    client.save()
   
    res.json('CLIENTE')
}




