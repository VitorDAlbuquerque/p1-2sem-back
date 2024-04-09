import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type typeName= {
    id: string
}

export class EditUserInfo {
    async handle(request: Request, response: Response){
        try {
            const { authorization } = request.headers;
            
            if (!authorization) {
                return response.status(500).send({ err: "Autorização inválida" });
            }

            const token = authorization.split(' ')[1];

            const { id } = jwt.verify(token, process.env.SECRET_TOKEN as string) as typeName;

            const user = await prisma.user.findUnique({ where: { id } });

            if (!user){
                return response.status(500).send({ err: "Usuário não encontrado" });
            }

            
            const { name, username, email, password, birthDate, gender, country } = request.body;

            if (name) user.name = name;
            //if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.password = password;
            if (birthDate) user.birthDate = birthDate;
            if (gender) user.gender = gender;
            if (country) user.country = country;

            await prisma.user.update({ where: { id }, data: user });

            return response.status(200).send({ message: "Usuário atualizado com sucesso" });
            
        } catch(error) {
            console.error(error);
            return response.status(500).send({ err: "Falha ao atualizar usuário. Por favor, tente novamente mais tarde." });
        }
    }
}
