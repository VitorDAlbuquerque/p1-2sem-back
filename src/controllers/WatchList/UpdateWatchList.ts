import { Request, Response } from "express";
import {prisma} from "../../database";
import jwt, { Jwt, verify } from 'jsonwebtoken';
import { DeleteWatchList } from "./DeleteWatchList";

type typeName = {
    id: string
}

export class UpdateWatchList{

    async handle( request: Request, response: Response){
        try{
            const {authorization} = request.headers;
            const {idwl, name, description, privacy} = request.body;

            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }

            const token = authorization.split(' ')[1]

            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as typeName;

            const user = await prisma.user.findUnique({where:{id}});

            if (!user){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }
        
            const verifywl = await prisma.watchList.findUnique({
                where:{
                    id:idwl
                }

            })

            if(!verifywl){
                return response.status(401).send({error: 'Não existe essa wathclist'})
            }

            const updateWatchList = await prisma.watchList.update({
                where: {
                    id:verifywl.id
                },
                data: {
                    name,
                    description,
                    privacy
                }
            })

            return response.status(200).json(updateWatchList)
        }
        catch{
            return response.status(500).send("Erro, tente novamente")
        }
    }
}
