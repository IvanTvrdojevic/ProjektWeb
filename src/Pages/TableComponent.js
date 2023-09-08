import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import {db} from '../firebase';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [locked, setLocked] = useState([]);
    const [secondTableTeams, setSecondTableTeams] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const url = 'https://premier-league-standings1.p.rapidapi.com/';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'c8d0fe0524msha50a68f76ac7c65p18b0b2jsndc55e9788859',
		    'X-RapidAPI-Host': 'premier-league-standings1.p.rapidapi.com'
	    }
    };
 
    useEffect(() => {
      let clubs = [];
      let points = [];
      let wins = [];
      let losses = [];
      let ties = [];
      
      const docRef = doc(db, "picks", username);    
      const docRefUsers = doc(db, "users", username); 
      const getData = async () => {
        const docSnap = await getDoc(docRef);
        const pickData = await docSnap.data();
        clubs = pickData.club.split(',');
        points = pickData.points.split(',');
        wins = pickData.wins.split(',');
        losses = pickData.losses.split(',');
        ties = pickData.ties.split(',');

        const secondTableTeamstmp = [];
        if(clubs.length < 20) return;
        for(let i = 0; i < 20; i++){
          const row = [clubs[i], parseInt(points[i]), parseInt(wins[i]), parseInt(losses[i]), parseInt(ties[i])];
          secondTableTeamstmp.push(row);
        }
        setSecondTableTeams(secondTableTeamstmp);
        setSelectedRows(secondTableTeamstmp);

        const docSnapUsers = await getDoc(docRefUsers);
        const userData = await docSnapUsers.data();
        setLocked(userData.locked);
      }
      getData();
      
      fetch(url, options) 
        .then(response => response.json())
        .then(data => {
          if(teams.length < 20){
            for(let i = 0; i < 20; i++){
              teams.push([data[i].team.name, data[i].stats.points, data[i].stats.wins, data[i].stats.losses, data[i].stats.ties])
            }
          } 
          setData(data); 
          setData(teams); 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

  const handleAddClick = (item) => { 
    if(locked == true) return;
    if(secondTableTeams.some(row => row.includes(item[0]))) return;

    if(secondTableTeams.includes(item)) return;
    if(secondTableTeams.indexOf(item) < 0){
      setSecondTableTeams(prevData => [...prevData, item]);
      setSelectedRows(prevSelectedRows => [...prevSelectedRows, item]);
    }   
    console.log(`Clicked + button for item ${item}`);
    console.log(secondTableTeams);
  };

  const handleRemoveClick = (item) => {
    if(locked == true) return;
    console.log(`Clicked - button for item ${item}`);
    var index = secondTableTeams.indexOf(item);

    var arrTeamsTmp = secondTableTeams.slice(0);
    arrTeamsTmp.splice(index, 1);
    setSecondTableTeams(arrTeamsTmp);

    var arrSelectedRowsTmp = selectedRows.slice(0);
    arrSelectedRowsTmp.splice(index, 1);
    setSelectedRows(arrSelectedRowsTmp);
  };

  const handleClearClick = () => {
    if(locked == true) return;
    setSecondTableTeams([]);
    setSelectedRows([]);
  };

  const handleLockClick = () => {
    if(secondTableTeams.length == 20){
      setLocked(1);
    }
    setDoc(doc(db, "users", username), {
      username: username,
      passowrd: password,
      locked: true
    }); 
  };

  const handleSaveClick = () => {
    if(secondTableTeams.length < 20) return;

    let clubs = [];
    let points = [];
    let wins = [];
    let losses = [];
    let ties = [];
    for(let i = 0; i < secondTableTeams.length; i++){
      clubs += [secondTableTeams[i][0]];
      clubs += ',';

      points += [secondTableTeams[i][1]];
      points += ',';

      wins += [secondTableTeams[i][2]];
      wins += ',';

      losses += [secondTableTeams[i][3]];
      losses += ',';

      ties += [secondTableTeams[i][4]];
      ties += ',';
    }

    setDoc(doc(db, "picks", username), {
      club: clubs,
      losses: losses,
      points: points,
      ties: ties,
      wins: wins
    }); 
  };

  return (
    <div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="first-column">Club</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th className="button-column"></th>
          </tr>
        </thead>
        <tbody>
        {teams.map(item => (
            <tr key={item[0]}
                className={secondTableTeams.some(row => row.includes(item[0])) ? 'selected-row' : ''}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>
                <button onClick={() => handleAddClick(item)}>+</button>
              </td>
            </tr>
          ))} 
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Club</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
          <th className="button-column"></th>   
          </tr>
        </thead>
        <tbody>
          {secondTableTeams.map(item => (
            <tr key={item}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>
                <button onClick={() => handleRemoveClick(item)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={() => handleLockClick()} className="btn btn-primary mx-3">Lock in</button>
        <button onClick={() => handleSaveClick()} className="btn btn-primary mx-3">Save</button>
        <button onClick={() => handleClearClick()} className="btn btn-primary mx-3">Clear</button>
      </div>
    </div>

  );
};

export default TableComponent;
