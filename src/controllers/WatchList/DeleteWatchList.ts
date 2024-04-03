import { Request, Response } from "express";
import {prisma} from "../../database";
import jwt from 'jsonwebtoken';

type typeName = {
    id: String
}

export class DeleteWatchList{


async handle (request: Request, response: Response){


    try{

        const {authorization} = request.headers;

        if(!authorization){
            return response.status(500).send({err: "Autorização inválida"});
        }

        const token = authorization.split(' ')[1];

        const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as typeName;

        const {name, idwl} = request.body;

        const verifywl = await prisma.watchList.findUnique({
            where:{
                id:idwl
            }
        })

        if(!verifywl){
            return response.status(401).send({error: 'Não existe essa watchlist'})
        }

        const deleteWatchList = await prisma.watchList.delete({
        
            where: {
                id:verifywl.id

            }
        })

        return response.status(200).json(deleteWatchList)

    }

    catch{
        return response.status(500).send("Erro, tente novamente")

    }
}

}