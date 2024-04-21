import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}
export class NewAssessment {
    async handle(request: Request, response: Response){
        try{
            const {text, note, movieBanner, movieId} = request.body;
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

            const newAssessment = await prisma.assessment.create({
                data:{
                    movieId,
                    note,
                    userId: user.id,
                    text,
                    movieBanner
                }
            })
            
            return response.status(201).json(newAssessment)

        }catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}