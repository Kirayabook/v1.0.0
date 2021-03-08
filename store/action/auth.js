export const AUTHFLOW = 'AUTHFLOW';
export const USER_LOGOUT = 'USER_LOGOUT'

export const authFlow = (status, userId, email, phone_number) => {
    return {type: AUTHFLOW, payload: {status, userId, email, phone_number}}
};

export const signOut = () => {
    return {type: USER_LOGOUT}
};