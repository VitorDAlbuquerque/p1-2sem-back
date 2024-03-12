import { Request, Response } from "express";
import {prisma} from '../../database'

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export class CreateNewUser {
    async handle(request: Request, response: Response){
        try{
            const {name, email, password, birthDate, gender, country} = request.body

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
                    email,
                    password: password_hash,
                    birthDate,
                    gender,
                    country  
                }
            })

            const {id} = newUser

            const token = jwt.sign(
                { id, name }, 
                process.env.SECRET_TOKEN as string, 
                { expiresIn: '1d' }
            );


            return response.status(201).json(newUser)
        } catch {
            return response.status(500).send('aaaa')
        }
    }
}