import { AUTHFLOW } from '../action/auth';

initial = {
    logStatus: '',
    userId: null,
    email: '',
    phone_number: ''
}

export default (state = initial, action) => {
    if (action.type === AUTHFLOW) {
        return {
            logStatus: action.payload.status,
            userId: action.payload.userId,
            email: action.payload.email,
            phone_number: action.payload.phone_number
        };
    }
    return state;
};