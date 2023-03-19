import { combineReducers } from "redux";
import { userReducers } from "./UserReducer/userReducer";
import { AdminReducers } from './UserReducer/adminReducer';

const rootReducer = combineReducers({
    userReducers,
    AdminReducers
});

export default rootReducer;