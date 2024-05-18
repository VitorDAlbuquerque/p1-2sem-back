import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';
type jwtbanana = {
    id:string
}

export class DeleteComments{
    async handle(request: Request, response:Response){
        try{
            const {commentId} = request.params 

            const comment = await prisma.comment.findUnique({where:{id:commentId}})
            if(!comment){
                return response.status(400).send("Comentário não encontrado!")
            }
            await prisma.comment.delete({where: {id:comment.id}})
            return response.status(200).json(comment)
        }            
        catch{
            return response.status(500).send("Tente novamente mais tarde")
        }
    }
}