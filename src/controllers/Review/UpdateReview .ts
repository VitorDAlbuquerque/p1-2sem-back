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
            const {authorization} = request.headers
            
            //vendo se o usuario ta logado 
            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }

            // pegando o token do usuario
            const token = authorization.split(' ')[1]

            //checando qual ID é o token que pegou
            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload


            //checando se tem essa usuario no banco
            const user = await prisma.user.findUnique({where: {id}})

            //erro se n tiver
            if(!user){
                return response.status(401).send({err: "Usuário não encontrado!"})
            }

            //atualizando o banco
            const updateReview = await prisma.review.update({
                where:{
                    reviewId:{
                        movieId,
                        userId: user.id
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