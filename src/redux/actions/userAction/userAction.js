var CryptoJS = require("crypto-js");
// Making Login And Logout action For User
export const LoginUser = (isLoggedIn, Role) => async(dispatch) => {


    var userRole = CryptoJS.AES.encrypt(JSON.stringify(Role), 'my-secret-key@123').toString();
    // var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
    // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const login = {
        isLoggedIn: isLoggedIn,
        userRole: userRole
    }

    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("Work", userRole);

    dispatch({ type: "SET_USER_DETAILS", payload: login });
}

export const LogoutUser = () => async(dispatch) => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT_USER" });
}