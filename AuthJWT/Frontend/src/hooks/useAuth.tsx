import { useSelector } from "react-redux";
import { RootState } from "../redux/store/Store";

const useAuth = () => {
    const currentUser = useSelector((state: RootState) => state.auth.CurrentUser);
    const jwt = currentUser.jwt;
    const user = currentUser.user;
    return {currentUser, jwt, user}
}

export default useAuth