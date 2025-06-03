import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUser } from '../composables/api/user.composable';
import type { User } from '../../../../packages/db/generated/client/index';
import type { Session } from '../../../../packages/db/generated/client/index';

export const useUserStore = defineStore('user', () => {
    const user = ref({} as User);
    const token = ref('');
    
    const { getById } = useUser();

    const getUser = () => {
        return user.value;
    };

    const getToken = () => {
        return token.value;
    };

    const getValues = () => {
        return {
            token : token.value,
            user : user.value,
        }
    };

    const setUserValues = (newToken : string, newUser : User) => {
        user.value = newUser;
        token.value = newToken;
    };

    const setFromSession = (session: Session) => {
        const userData = getById(session.userId).data.value;
        if (userData) {
            user.value = { 
                id : userData.id,
                name: userData.name,
                createdAt: new Date(userData.createdAt),
                updatedAt: new Date(userData.updatedAt),
                email: userData.email,
                emailVerified: userData.emailVerified,
                image: userData.image,
                };
        }
        token.value = session.token;
    };

    return {getUser, getToken, getValues, setUserValues, setFromSession};
});