import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListPopularWacthList {
    async handle(request: Request, response: Response){
        const allWatchList = await prisma.watchList.findMany({
            where: {
                privacy: false
            },
            orderBy:{
                numberLikes: "desc"
            },

            include:{
                user:{
                    select:{
                        name: true,
                        id: true
                    }
                },
                isLiked:{
                    select:{
                        userId: true,
                        watchListId: true
                    }
                },
                comment:{
                    select:{
                        userId: true
                    }
                }
            }
        })
        return response.json(allWatchList)
    }
}