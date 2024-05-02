import { Request, Response } from "express";
import { prisma } from "../../database";

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export class Auth {
    async handle(request: Request, response: Response){
        try{
            const {email, password} = request.body
            const userExists = await prisma.user.findUnique({
                where:{
                    email
                }
            })

            if(!userExists){
                return response.status(400).send({error: "Usuário não encontrado"})
            }

            const isValidPassword = await bcryptjs.compare(password, userExists.password);

            if(!isValidPassword){
                return response.status(401).send({err:"Username ou senha incorretos!"})
            }

            const {id, name} = userExists

            const token = jwt.sign(
                { id, name }, 
                process.env.SECRET_TOKEN as string, 
                { expiresIn: '1d' }
            );

            return response.status(200).send({ token, userExists});

        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}