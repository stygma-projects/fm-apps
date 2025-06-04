import { useSession } from '../composables/api/session.composable';

export default defineNuxtRouteMiddleware(async (to, from) => {

    const { getValues } = useUserStore();
    const { getByValues } = useSession();
    const { token, user } = getValues();
    const authorizedPages = ['/auth/login', '/auth/create-account', '/'];

    // console.log('Search values : ', token, user?.id);
    
    // Vérifie que token et user.id existent
    if (!token || !user?.id) {
        if (!authorizedPages.includes(to.path)) {
            return navigateTo('/auth/login');
        }
        return;
    }
    
    const session = await getByValues(getValues().token, getValues().user.id).data.value;
    // console.log('Search results : ', session);
    
    if (!session && !(authorizedPages.includes(to.path))) {
        return navigateTo('/auth/login');   
    }
})