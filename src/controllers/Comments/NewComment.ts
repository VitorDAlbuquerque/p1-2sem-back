import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../../database";

type JwtPayload = {
    id:string
}
export class NewComment {
    async handle(request: Request, response: Response){
        try{
            const {text, watchlistId} = request.body

            const watchList = await prisma.watchList.findUnique({
                where: {
                    id: watchlistId
                }
            })

            if(!watchList){
                return response.status(401).send({err: "WatchList não encontrada!"})
            }

            if(!text){
                return response.status(401).send({err: "Sem texto!"})
            }

            const newComment = await prisma.comment.create({
                data:{
                    userId: request.userId,
                    watchListId: watchList.id,
                    text
                }
            })

            return response.status(201).json(newComment)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}