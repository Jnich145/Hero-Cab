import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Outlet } from 'react-router-dom'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FAQ from './components/FAQ'


const API_URL = import.meta.env.VITE_API_HOST
const App = () => {
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
