import { Request, Response } from "express";
import {prisma} from "../../database";



export class Movies {

    async handle (request: Request, response: Response){


try{



    const {name, idwl} = request.body;

    const verifywl = await prisma.watchList.findUnique({
        where:{
            id:idwl
        }

    })
    

    if(!verifywl){
        return response.status(401).send("Não existe")
    }


    const newmovie = await prisma.savedMovies.create({
    data: {

        name,
        MovieID:verifywl.id
    }

    })



return response.status(200).json(newmovie)

}
catch{
        return response.status(500).send("Erro, tente novamente")
}




    }






}