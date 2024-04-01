import { Request, Response } from "express";
import {prisma} from "../../database";
import jwt, { Jwt } from 'jsonwebtoken';



export class DeleteWatchList{


async handle (request: Request, response: Response){


    try{

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
            data: {

                name,
                idwl:verifywl.id

            }
        })

        return response.status(200).json(deleteWatchList)

    }

    catch{
        return response.status(500).send("Erro, tente novamente")

    }
}

}