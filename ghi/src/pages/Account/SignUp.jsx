import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const { login } = useToken()
  const { baseUrl, setToken } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      special_needs: false
  })

  const handleFormChange = (event) => {
      const inputName = event.target.name
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
      setFormData({
          ...formData,
          [inputName]: value
      })
  }

  const handleRegistration = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(
          `${baseUrl}/api/accounts`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw Error(
            "Couldn't create account, please try a different email address"
          );
        }
        else {
            console.log('account created')
        }
        const token = await login(
            formData.email,
            formData.password
        );
        setToken(token);
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
      <div className="card-body">
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
          </div>
        )}
        <form onSubmit={handleRegistration}>
          <div className="mb-3">
            <label className="form-label">email</label>
            <input
                name="email"
                type="text"
                className="form-control"
                value={formData.email}
                onChange={handleFormChange}
                required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">first</label>
            <input
              name="first_name"
              type="text"
              className="form-control"
              value={formData.first_name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">last</label>
            <input
              name="last_name"
              type="text"
              className="form-control"
              value={formData.last_name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">special_needs</label>
            <input
              name="special_needs"
              type="checkbox"
              className="form-check-input"
              checked={formData.special_needs}
              onChange={handleFormChange}
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
