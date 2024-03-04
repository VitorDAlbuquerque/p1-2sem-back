import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListAllUsers {
    async handle(request: Request, response: Response){
        const allusers = await prisma.user.findMany()
        return response.json(allusers)
    }
}