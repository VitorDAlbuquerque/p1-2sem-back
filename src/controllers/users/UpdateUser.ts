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
            const { authorization } = request.headers;
            const {name, email, password, birthDate, country, gender, bio} = request.body
            console.log(password)
            if (!authorization) {
                return response.status(500).send({ err: "Autorização inválida" });
            }
            const token = authorization.split(' ')[1];

            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as jwtPayload;

            const user = await prisma.user.findUnique({where:{id}});

            if (!user){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }

           
            const updateUser = await prisma.user.update({
                where:{
                    id
                },
                data:{
                    name: name? name : user.name,
                    email: email? email : user.email,
                    password: password? bcryptjs.hashSync(password, 8) : user.password,
                    birthDate: birthDate? birthDate : user.birthDate,
                    country: country? country : user.country,
                    gender: gender? gender : user.gender,
                    bio: bio? bio : user.bio
                }
            })
            return response.status(200).json(updateUser)
           
            
        } catch{
            return response.status(500).send({ err: "Falha! Por favor tente novamente mais tarde." });
        }
    }
}