import React, { useState } from "react";
 
import { setUserSession } from "./Utils/Common";

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput("");
  const name = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const data = await fetch("http://localhost:3001/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				email: email.value,
                name:name.value,
                password:password.value
			})
		}).then(res => res.json())
      .then((response) => {
        setLoading(false);
        setUserSession(response.token, response.user);

        // console.log(response.data.token, response.data.user)
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.status === 401)
          setError(error);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div>
      Signup
      <br />
      <br />
      <div>
        name
        <br />
        <input type="text" {...name} autoComplete="new-password" />
      </div>
      <div>
        email
        <br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Sinup"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Signup;
