import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListPopularWacthList {
    async handle(request: Request, response: Response){
        const allWatchList = await prisma.watchList.findMany({

            include:{
                user:{
                    select:{
                        name: true
                    }
                }
            }
        })
        return response.json(allWatchList)
    }
}