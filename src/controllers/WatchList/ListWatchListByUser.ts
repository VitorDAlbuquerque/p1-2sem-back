import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../../database";

type jwtPayload = {
    id: string
}

export class ListWatchListByUser {
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
    
            if(!user){
                return response.status(401).send({err: "Usuário não encontrado!"})
            }
    
            const watchLists = await prisma.watchList.findMany({
                where: {
                    authorId: user.id
                },
                include: {
                    user: {
                        select:{
                            name: true
                        }
                    }
                }
            })
    
            return response.status(200).json(watchLists)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }  
    }
}