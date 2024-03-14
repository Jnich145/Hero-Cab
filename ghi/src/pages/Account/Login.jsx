import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const { login } = useToken();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
      const logged_in = await login(username, password);
      if (logged_in == true) {
        event.target.reset();
        navigate('/')
      } else {
        setError('Incorrect username or password')
      }
  }

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        {error && (
            <div className="alert alert-danger" role="alert">
              {error}
          </div>
        )}
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
