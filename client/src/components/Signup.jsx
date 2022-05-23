import React, { useState } from 'react'
import { NavLink ,useNavigate } from 'react-router-dom'

export default function Signup() {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });
  let name, value;
  function handleInputs(e) {
    name = e.target.name
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  async function postData(e) {
    e.preventDefault();
    const {name, email, phone, work, password, cpassword}= user;
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    })
    console.log("hello")
    Navigate("/login");
  }

  return (
    <>
      <div className="contain">
        <div className='Form'>
          <form >
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" className='field' name="name" id="name" value={user.name} onChange={handleInputs} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" className='field' name="email" id="email" value={user.email} onChange={handleInputs} />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="number" className='field' name="phone" id="phone" value={user.phone} onChange={handleInputs} />
            </div>
            <div>
              <label htmlFor="work">Work</label>
              <input type="text" className='field' name="work" id="work" value={user.work} onChange={handleInputs} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" className='field' name="password" id="password" value={user.password} onChange={handleInputs} />
            </div>
            <div>
              <label htmlFor="cpassword">Confirm Password</label>
              <input type="password" className='field' name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} />
            </div>
            <button type='submit' id="but" onClick={postData}>Register</button>
          </form>
          <NavLink to="/login" id='Already'> Already Registerd </NavLink>
        </div>
      </div>
    </>
  )
}
