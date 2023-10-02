import { useSelector } from "react-redux";
import { RootState } from "../redux/store/Store";

const useAuth = () => {
    const currentUser = useSelector((state: RootState) => state.auth.CurrentUser);
    const jwt = currentUser.jwt;
    const user = currentUser.user;
    const money = currentUser.user.money;
    const email = currentUser.user.email;
    const name = currentUser.user.name;
    const role_id = currentUser.user.role_id;
    return {currentUser, jwt, user, money, email, name, role_id}
}

export default useAuth