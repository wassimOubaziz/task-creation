import React from "react";
import aboutImage from "./images/about-image.jpg";
import teamImage1 from "./images/team-member1.jpg";
import teamImage2 from "./images/team-member2.jpg";
import teamImage3 from "./images/team-member3.jpg";
import NavBar from "../../components/NavBar.component";

function AboutPage() {
  return (
    <div className="container">
      <NavBar />
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-md-6">
          <img src={aboutImage} alt="About" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>About Task Manager</h2>
          <p>
            Task Manager is a powerful web application that helps you stay
            organized and manage your tasks effectively.
          </p>
          <p>
            Our mission is to provide you with a user-friendly platform that
            allows you to create, track, and complete tasks with ease. Whether
            you are managing personal projects or working in a team, Task
            Manager has got you covered.
          </p>
          <p>
            With Task Manager, you can set deadlines, assign tasks, track
            progress, and collaborate seamlessly with others. Our intuitive
            interface and powerful features make task management a breeze.
          </p>
        </div>
      </div>

      <h2 className="mt-5 mb-4">Meet Our Team</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src={teamImage1}
              className="card-img-top"
              alt="Team Member 1"
            />
            <div className="card-body">
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">Lead Developer</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src={teamImage2}
              className="card-img-top"
              alt="Team Member 2"
            />
            <div className="card-body">
              <h5 className="card-title">Jane Smith</h5>
              <p className="card-text">UX Designer</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src={teamImage3}
              className="card-img-top"
              alt="Team Member 3"
            />
            <div className="card-body">
              <h5 className="card-title">Mike Johnson</h5>
              <p className="card-text">Marketing Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
