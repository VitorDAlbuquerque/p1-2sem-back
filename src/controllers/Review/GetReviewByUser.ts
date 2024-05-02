import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}

export class GetReviewByUser{
    async handle(request: Request, response: Response){
        try{
            const {movieId} = request.params
            const {authorization} = request.headers
            if(!authorization){
                return response.status(401).send({error: 'err!'})

            }

            const token = authorization.split(' ')[1]

            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload
            const user = await prisma.user.findUnique({where: {id}})
       
            if(!user){
                return response.status(401).send({error: 'err!'})
            }

            const review = await prisma.review.findUnique({
                where: {
                    reviewId:{
                        movieId,
                        userId: user.id
                    }
                },
               
                include:{
                    user:{
                        select:{
                            name: true,
                        }
                    }
                }
            })

            return response.status(201).json(review)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}