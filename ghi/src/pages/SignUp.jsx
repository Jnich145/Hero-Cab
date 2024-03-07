import { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { login, register } from "./services/auth";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { baseUrl, setToken } = useAuthContext();
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        // It's very important to grab currentTarget now because
        // when this callback ends, the browser sets it to null
        const form = e.currentTarget;
        const accountData = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
        };
        try {
        await register(accountData);
        const token = await login(
            baseUrl,
            accountData.username,
            accountData.password
        );
        setToken(token);
        // Reset the form
        form.reset();
        navigate("/");
        } catch (e) {
        if (e instanceof Error) {
            setErrorMessage(e.message);
        }
        console.error(e);
        }
    };


  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Signup</h5>
    <div className="mb-3">
    <label className="form-label">email</label>
    <input
        name="email"
        type="text"
        className="form-control"
        onChange={(e) => {
        setEmail(e.target.value);
        }}
    />
    </div>
      <div className="card-body">
        <form onSubmit={handleRegistration}>
          <div className="mb-3">
            <label className="form-label">password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">first</label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">last</label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};


export default SignUp
