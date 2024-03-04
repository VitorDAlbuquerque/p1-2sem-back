import { Request, Response } from "express";
import {prisma} from '../../database'

import bcryptjs from 'bcryptjs'

export class CreateNewUser {
    async handle(request: Request, response: Response){
        try{
            const {name, username, password} = request.body

            console.log(name, username, password)

            const userExists = await prisma.user.findUnique({
                where: {
                    username
                }
            })

            if(userExists){
                return response.status(409).send({ error: 'Username já cadastrado com outro Usuario!' });
            }

            const password_hash = bcryptjs.hashSync(password, 8);


            const newUser = await prisma.user.create({
                data:{
                    name,
                    username,
                    password: password_hash
                }
            })
            return response.status(201).json(newUser)


        } catch {
            
            return response.status(500).send('aaaa')
        }
    }
}