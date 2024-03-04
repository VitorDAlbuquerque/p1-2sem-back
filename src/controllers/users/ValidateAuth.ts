import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type jwtPayload = {
    id: string
}

export class ValidateAuth {
    async handle(request: Request, response: Response){
        try{
            const {authorization} = request.headers

            if(!authorization){
                return response.status(401).send({ error: 'Err!' });
            }

            const token = authorization.split(' ')[1]

            const { id } = jwt.verify(token, process.env.SECRET_TOKEN as string) as jwtPayload

            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            return response.status(200).send(user);

        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}