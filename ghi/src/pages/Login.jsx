import { useNavigate } from 'react-router-dom'

const Login = () => {
        const navigate = useNavigate()
        const handleSubmit = (event) => {
            event.preventDefault()
            console.log('Submitting form to API...')
            navigate('/')
        }
    return (
        <>
            <h1 className="text-3xl">Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email: <br />
                        <input type="email" id="email" placeholder="Email" />
                    </label>
                </div>
                <div>
                    <label placeholder="password">
                        Password: <br />
                        <input type="password" id="password" placeholder="Password" />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login
