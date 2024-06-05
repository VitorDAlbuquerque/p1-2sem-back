import { Request, Response } from "express";
import {prisma} from '../../database'

import bcryptjs from 'bcryptjs'

export class CreateNewUser {
    async handle(request: Request, response: Response){
        try{
            const {name, username, email, password, birthDate, gender, country, isADM} = request.body

            const userExists = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(userExists){
                return response.status(409).send({ error: 'Username já cadastrado com outro Usuario!' });
            }
            const password_hash = bcryptjs.hashSync(password, 8);
            const newUser = await prisma.user.create({
                data:{
                    name,
                    username: `@${username}`,
                    email,
                    password: password_hash,
                    birthDate,
                    gender,
                    country,
                    imgIndex: Math.floor(Math.random() * 19),
                    isADM: isADM
                }
            })

            return response.status(201).json(newUser)
        } catch {
            return response.status(500).send('aaaa')
        }
    }
}