import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type jwtPayload = {
    id: string
}

export class ValidateAuth {
    async handle(request: Request, response: Response){
        try{
            const user = await prisma.user.findUnique({
                where: {
                    id: request.userId
                }
            })

            return response.status(200).send(user);

        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}