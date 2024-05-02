import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../../database";

type JwtPayload = {
    id:string
}
export class NewComment {
    async handle(request: Request, response: Response){
        try{
            const {authorization} = request.headers
            const {text, watchlistId} = request.body

            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }
            const token = authorization.split(' ')[1]

            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload

            const user = await prisma.user.findUnique({where: {id}})

            if(!user){
                return response.status(401).send({err: "Usuário não encontrado!"})
            }

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
                    userId: user.id,
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