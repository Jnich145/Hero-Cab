import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Outlet } from 'react-router-dom'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const API_URL = 'http://localhost:8000'
const App = () => {
    const { token } = useAuthContext()
    return (
        <AuthProvider baseUrl={API_URL}>
            <div className="container-wrapper">
                <Nav />

                <Outlet />

                <Footer />

            </div>
        </AuthProvider>
    )
}
export default App
