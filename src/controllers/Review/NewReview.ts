import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}
export class NewReview {
    async handle(request: Request, response: Response){
        try{
            
            const {text, rating, movieBanner, movieId} = request.body;
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

            const newReview = await prisma.review.create({
                data:{
                    movieId,
                    rating,
                    userId: user.id,
                    text,
                    movieIMG: movieBanner
                }
            })
            
            return response.status(201).json(newReview)

        }catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}