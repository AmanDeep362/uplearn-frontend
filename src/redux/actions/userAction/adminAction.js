export const LoginAdmin = () => async(dispatch) => {
    sessionStorage.setItem("isAdminLoggedIn", 1);
    dispatch({ type: "SET_ADMIN_USER_DETAILS", payload: 1 });
}