import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Submitting form to API...")
        navigate('/login')

    }

    return (
        <>
            <h1 className="text-3xl">SignUp</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email: <br />
                        <input type="email" placeholder="Email" />
                    </label>
                </div>
                <div>
                    <label>
                        Password: <br />
                        <input type="text" placeholder="Password" />
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default SignUp
