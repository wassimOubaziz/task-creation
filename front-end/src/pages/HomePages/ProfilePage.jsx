import React, { useEffect, useState } from "react";
import NavBarHome from "../../components/NavBarHome.component";
import ax from "../../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ax.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies.token]);

  const updateTheUser = (e) => {
    e.preventDefault();
    ax.put(
      "/user/profile",
      {
        userName,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        if (password) {
          //remove token and expire cookie
          removeCookie("token", {
            path: "/",
            maxAge: 0,
          });

          navigate("/login");
        }
        setUserName("");
        setPassword("");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <NavBarHome />
      <div className="row">
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile"
            />
            <h5 className="font-weight-bold mt-4">
              {user?.userName || "Undefined"}
            </h5>
            <p className="text-muted">{user?.email || "Undefined"}</p>
          </div>
        </div>
        <div
          className="col-md-8 border-right"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="p-3 py-5">
            <h4 className="mb-4">Profile Settings</h4>
            <div className="mb-3">
              <label htmlFor="username" className="labels">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="labels">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={updateTheUser}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
