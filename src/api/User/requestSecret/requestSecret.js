import { generatorSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        requestSecret: async (_, args, {request}) => {
            console.log(request.user)
            const { email } = args;
            const loginSecret = generatorSecret();
            try {
                throw Error("EE")
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({ data: { loginSecret }, where: { email } });
                return true;  
            } catch (error) {
                return false;
            }
            
        }
    }
}