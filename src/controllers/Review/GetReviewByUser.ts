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

            const review = await prisma.review.findUnique({
                where: {
                    reviewId:{
                        movieId,
                        userId: request.userId
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