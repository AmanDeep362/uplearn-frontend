const initialState = {
    isAdminLoggedIn: sessionStorage.getItem("isAdminLoggedIn") || 0,
};

export const AdminReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ADMIN_USER_DETAILS":
            {
                return {
                    ...state,
                    isAdminLoggedIn: action.payload,
                };
            }
        default:
            return state;
    }
};