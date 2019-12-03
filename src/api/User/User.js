import { prisma } from "../../../generated/prisma-client";

export default {

    User: {
        fullName: parent => {   
            return `${parent.firstName} ${parent.lastName}`
        },
        isFollowing: async (parent, __, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [ { id: parentId }, { followers_some: {id: user.id} } ]
                });
                
            } catch (error) {
                return false;    
            }
            
        },
        itSelf: (parent, _, {request}) => {
            const user = request;
            const { id: parentId } = parent;

            return user.id === parentId;
        }
    }
};
