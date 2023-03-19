const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || 0,
    userRole: localStorage.getItem("Work") || "",
};

export const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DETAILS":
            {
                return {
                    ...state,
                    isLoggedIn: action.payload.isLoggedIn,
                    userRole: action.payload.userRole
                };
            }
        case "LOG_OUT_USER":
            {
                return {...initialState };
            }
        default:
            return state;
    }
};