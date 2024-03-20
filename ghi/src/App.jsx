import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Outlet } from 'react-router-dom'
import Nav from "./components/Nav";
import Footer from "./components/Footer";


const API_URL = 'http://localhost:8000'
const App = () => {
    return (
        <AuthProvider baseUrl={API_URL}>
            <div className="container-wrapper">
                <Nav />

                <Outlet />

                <ReviewCarousel />

                <Footer />
            </div>
        </AuthProvider>
    )
}
export default App
