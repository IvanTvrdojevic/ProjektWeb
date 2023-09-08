import React from 'react';
import Navbar from './Navbar'
import './Home.css'

function Home() {
  const username = localStorage.getItem("username");
  console.log(username);
  return (
    <div>
      <div><Navbar ></Navbar></div>
      <div className="home-page">
      <h1 className="headline">Welcome</h1>
      <h2 className="headline">Here are the rules</h2>
      <p className="description">
        To save your picks, you need to select every team. After clikcing save the standings will be saved in the database.
      </p>
      <p className="description">
        After clicking "Lock-in" the standings can not be updated anymore.
      </p>
      </div>
    </div>
  );
}

export default Home;
