import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}
export class DeleteAsssessment {
    async handle(request: Request, response: Response){
        try{
            const {authorization} = request.headers
            const {movieId} = request.body

            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }
            const token = authorization.split(' ')[1]

            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload

            const user = await prisma.user.findUnique({where: {id}})

            if(!user){
                return response.status(401).send({err: "Usuário não encontrado!"})
            }

            const deleteAsssessment = await prisma.assessment.delete({
                where:{
                    assessmentId:{
                        movieId,
                        userId: user.id
                    }
                }
            })
            return response.status(201).json(deleteAsssessment)

        }catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}