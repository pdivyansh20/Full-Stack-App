import React, { useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
export default function Login() {
  const {state, dispatch}  = useContext(UserContext)

  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function LoginUser(e) {
    e.preventDefault();
    const res = await fetch("/sigin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (!data || res.status === 400) {
      window.alert("Invalid Credential");
    } else {
      dispatch({type:"USER",payload:true})
      window.alert("login successful");
      Navigate("/");
    }
  }
  return (
    <>
      {" "}
      <div className="contain">
        <div className="Form">
          <form action="" autoComplete="off">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email" className="field" name="email" id="email" value={email} onChange={function (e) { setEmail(e.target.value); }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password" className="field" name="password" id="password" value={password} onChange={function (e) { setPassword(e.target.value); }}
              />
            </div>

            <button type="submit" id="but" onClick={LoginUser}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
