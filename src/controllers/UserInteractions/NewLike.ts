import e, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../../database";

type JwtPayload = {
    id:string
}
export class NewLike {
    async handle(request: Request, response: Response){
        try{
            const {authorization} = request.headers
            const {watchlistId} = request.body
            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }

            const token = authorization.split(' ')[1]

            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload

            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

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

            const isLiked = await prisma.isLiked.findUnique({
                where: {
                    likeId: {
                        watchListId: watchList.id,
                        userId: user.id
                    }
                }
            })

            if(!isLiked){
                const newLike = await prisma.isLiked.create({
                    data:{
                        userId: user.id,
                        watchListId: watchList.id
                    }
                })
                await prisma.watchList.update({
                    where:{
                        id: watchList.id
                    },
                    data:{
                        numberLikes: watchList.numberLikes+1
                    }
                })
                return response.status(200).json(newLike)

            } else{
                const deleteLike = await prisma.isLiked.delete({
                    where: {
                        likeId: {
                            watchListId: watchList.id,
                            userId: user.id
                        }
                    }
                })
                await prisma.watchList.update({
                    where:{
                        id: watchList.id
                    },
                    data:{
                        numberLikes: watchList.numberLikes-1
                    }
                })
                return response.status(201).json(deleteLike)
            }

        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}