import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import signInImage from "./images/sign-in-image.png";
import NavBar from "../../components/NavBar.component";
import backgoudImage from "./images/signin.jpg";
import ax from "../../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/home");
    }
  }, [cookies.token, navigate]);

  const handleSignIn = (e) => {
    e.preventDefault();
    ax.post("/signin", {
      email,
      password,
    })
      .then((response) => {
        console.log(response.data);
        setCookie("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <NavBar />
      <div className="row">
        <img
          src={backgoudImage}
          alt="background"
          style={{
            position: "absolute",
            height: "100vh",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: -1,
            padding: 0,
            filter: "blur(6px)",
          }}
        />
        <div className="row justify-content-center align-items-center h-100">
          <div
            className="col-md-6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "70%",
              marginTop: "50px",
            }}
          >
            <div className="card">
              <div
                className="row g-0"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <div className="col-md-6">
                  <img
                    src={signInImage}
                    alt="Sign In"
                    className="img-fluid mb-4"
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h2 className="display-4 mb-4">Sign In</h2>
                    <form onSubmit={handleSignIn}>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          aria-describedby="emailHelp"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg mt-4"
                      >
                        Sign In
                      </button>
                    </form>
                    <p className="mt-3">
                      Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
