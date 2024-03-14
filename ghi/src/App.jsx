import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Outlet } from 'react-router-dom'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ReviewCarousel from "./components/ReviewCarousel";


const API_URL = 'http://localhost:8000'
const App = () => {
    return (
        <AuthProvider baseUrl={API_URL}>
            <div className="container-wrapper">
                <Nav />

                <Outlet />

                <Footer />

                <ReviewCarousel />
            </div>
        </AuthProvider>
    )
}
export default App
