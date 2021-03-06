import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
      createAccount: async (_, args) => {
        const { username, email, firstName = "", lastName = "", bio = "" } = args;
        try {
          const exits = await prisma.$exists.user({username});
          if(exits) {
            throw Error("This username / email already exits");
          }
          const user = await prisma.createUser({
            username,
            email,
            firstName,
            lastName,
            bio
          });
          return true;
        }catch(err) {
          return false;
        }
        
      }
    }
  };