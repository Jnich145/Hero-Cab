import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const { logout } = useToken();
    const navigate = useNavigate()

    const logout_func = async () => {
        const logged_out = await logout();
        if (logged_out == true) {
            navigate('/login')
        } else {
            console.error('Failed to logout')
        }
    }

    return (
        <button className="btn btn-danger" onClick={logout_func}>
            Logout <i className="bi bi-box-arrow-left"></i>
        </button>
    )
}
export default LogoutButton;
