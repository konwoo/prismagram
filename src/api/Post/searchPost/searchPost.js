import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchPost: async (_, args) => {
           return await prisma.posts({
                where: {
                    OR: [
                        { location_starts_with: args.term },
                        { caption_starts_with : args.term }
                    ]
                }
            })
        }
    }
}