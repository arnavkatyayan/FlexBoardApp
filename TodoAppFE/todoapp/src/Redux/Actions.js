export const LOGIN = 'LOGIN';

export const login = (ID,Pass) => {
    return {
        type: LOGIN,
        payload: (ID === "USER" && Pass === "PASS") ? true:false  // Reverse the text
    };
};





