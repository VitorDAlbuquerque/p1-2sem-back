import e, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../../database";

type JwtPayload = {
    id:string
}
export class NewLike {
    async handle(request: Request, response: Response){
        try{
            const {watchlistId} = request.body

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
                        userId: request.userId
                    }
                }
            })

            if(!isLiked){
                const newLike = await prisma.isLiked.create({
                    data:{
                        userId: request.userId,
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
                            userId: request.userId
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