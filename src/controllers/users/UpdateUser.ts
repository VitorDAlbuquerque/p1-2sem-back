import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "../../database";
import bcryptjs from 'bcryptjs'
type jwtPayload = {
    id: string
}
export class UpdateUser{
    async handle(request: Request, response: Response){
        try{
            const {name, email, password, birthDate, country, gender, bio, imgIndex} = request.body

            const user = await prisma.user.findUnique({where:{id: request.userId}});
            if (!user){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }
            const updateUser = await prisma.user.update({
                where:{
                    id: user.id
                },
                data:{
                    name: name? name : user.name,
                    email: email? email : user.email,
                    password: password? bcryptjs.hashSync(password, 8) : user.password,
                    birthDate: birthDate? birthDate : user.birthDate,
                    country: country? country : user.country,
                    gender: gender? gender : user.gender,
                    bio: bio? bio : user.bio,
                    imgIndex: imgIndex != -1? imgIndex : user.imgIndex
                }
            })
            return response.status(200).json(updateUser)
           
            
        } catch{
            return response.status(500).send({ err: "Falha! Por favor tente novamente mais tarde." });
        }
    }
}