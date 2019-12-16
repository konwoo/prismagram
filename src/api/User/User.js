import { prisma } from "../../../generated/prisma-client";

export default {

    User: {
        posts: ({ id }) => prisma.user({ id }).posts(),
        followings: ({ id }) => prisma.user({ id }).followings(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        postsCount: ({ id }) => prisma.postsConnection({ where: { user: { id } }}).aggregate().count(),
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
        followerCount: ({ id }) => prisma.usersConnection({ where: { followers_some: { id } }}).aggregate().count(),
        followingCount: ({ id }) => prisma.usersConnection({ where: { followings_some: { id }}}).aggregate().count(),
        itSelf: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};
