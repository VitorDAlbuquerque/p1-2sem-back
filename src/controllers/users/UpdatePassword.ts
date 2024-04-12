import { Request, Response } from "express";
import { prisma } from "../../database";
import bcryptjs from 'bcryptjs'

export class UpdatePassword {
    async handle(request: Request, response: Response){
        try{
           
            const {email, password} = request.body
            
           
            const updatePassword = await prisma.user.update({
                where:{
                    email
                },
                data:{
                    password: password? bcryptjs.hashSync(password, 8) : password,
                }
            })
            return response.status(200).json(updatePassword)
           
        } catch{
            return response.status(500).send({ err: "Falha! Por favor tente novamente mais tarde." });
        }
    }
}