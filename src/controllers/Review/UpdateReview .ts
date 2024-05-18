import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}
export class UpdateReview {
    async handle(request: Request, response: Response){
        try{
            
            //puxando valor das variaveis pelo body e headers
            const {text, rating, movieId} = request.body;
            
            //atualizando o banco
            const updateReview = await prisma.review.update({
                where:{
                    reviewId:{
                        movieId,
                        userId: request.userId
                    }
                },
                data:{
                    rating,
                    text,
                }
            })

            //retorno do acerto
            return response.status(201).json(updateReview)

        }catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}