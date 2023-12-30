import React from "react";
import { axios } from "../Utils/axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";

const Login = () => {
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

      try {
         const endpoint = email === adminEmail ? "/admin/login" : "/user/login";
         const response = await axios.post(endpoint, { email, password });

         if (response.status === 200) {
            localStorage.setItem("userId", response.data.userId);
            alert("Success");
            navigate(email === adminEmail ? "/dashboard" : "/todo");
         } else {
            alert("Failed!");
         }
      } catch (error) {
         console.error("Error:", error);
         alert("Failed!");
      }
   };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
               <h1 className="text-light mb-4">WELCOME</h1>
               <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 w-50">
                  <Form.Control type="email" placeholder="name@example.com" name="email" required />
               </FloatingLabel>
               <FloatingLabel controlId="floatingPassword" className="w-50" label="Password">
                  <Form.Control type="password" placeholder="Password" name="password" defaultValue="123" required />
               </FloatingLabel>
               <button type="submit" className="custom-btn mt-3 fw-bolder px-3 py-1 rounded-pill">
                  Log In
               </button>
            </div>
         </form>
      </>
   );
};

export default Login;
