import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt  from 'jsonwebtoken';

type JwtPayload = {
    id:string
}


export class UpdateComments {


    async handle (request: Request, response: Response){

        try{
        
                const {text, commentId} = request.body
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

                const comment = await prisma.comment.findUnique({
                    where: {id:commentId}
                })

                if(!comment){
                    return response.status(401).send({error: 'err!'})
                }

                const updateComments = await prisma.comment.update({
                    where: {
                        id:commentId
                    },
                    data: {
                        text: text
                    }
                })


                return response.status(201).json(updateComments)
        }catch{
            return response.status(500).send({err: "Falha! Por favor tente mais tarde"})
        }

}

}
