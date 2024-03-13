import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';


export class CreateWatchList {

    async handle(request: Request, response: Response){

        try{

            const {name, description, privacy} = request.body;


        }

        catch{

        }
    }
    
}