import { LOGIN } from './Actions';

const initialState = {
    loginCred:false
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        // case REVERSE_TEXT:
        //     return {
        //         ...state,
        //         reversedText: action.payload
        //     };
        //     case IS_PALI:
        //         return {
        //             ...state,
        //             isPali: action.payload
        //         };
            case LOGIN:
                return {
                    ...state,
                    loginCred:action.payload
                }
        default:
            return state;
    }
};

export default Reducer;