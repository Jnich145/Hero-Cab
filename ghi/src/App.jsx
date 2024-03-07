import { Outlet } from 'react-router-dom'
import Nav from './components/Navbar'

const App = () => {
    return (
        <div className="container">
                <Nav />

                <Outlet />
        </div>
    )
}
export default App
