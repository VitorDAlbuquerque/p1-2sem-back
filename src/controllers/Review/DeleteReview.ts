import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}
export class DeleteReview {
    async handle(request: Request, response: Response){
        try{
            const {movieId} = request.params

            const deleteReview = await prisma.review.delete({
                where:{
                    reviewId:{
                        movieId,
                        userId: request.userId
                    }
                }
            })
            return response.status(201).json(deleteReview)

        }catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}