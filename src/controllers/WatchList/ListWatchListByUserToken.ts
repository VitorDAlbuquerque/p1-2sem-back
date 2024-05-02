import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}

export class ListWatchListByUserToken {
    async handle(request: Request, response: Response){
        try{
            const {authorization} = request.headers
            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }
            const token = authorization.split(' ')[1]

            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload

            const user = await prisma.user.findUnique({where: {id}})

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
                    },
                    isLiked:{
                        select:{
                            userId: true,
                            watchListId: true
                        }
                    },
                    comment:{
                        select:{
                            userId: true
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