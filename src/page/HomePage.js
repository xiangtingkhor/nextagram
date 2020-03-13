import React, {useState, useEffect} from 'react';
import UserImages from '../container/UserImages';
import loader from '../Eclipse-1s-200px.gif'
import axios from 'axios';
import { Link } from 'react-router-dom';


const HomePage = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  
    useEffect(() => {
      axios.get("https://insta.nextacademy.com/api/v1/users/")
      .then ((response) => {
        setUsers(response.data)
         setIsLoading (false)
      })
    }, [])

    return (
        <div className="App">
      <div>
        {
        isLoading
        ? 
        <div style={{display:"flex", justifyContent: "center"}}>
        <img src={loader}/>
        </div>
        : 
          users.map((user, key) => {
          return (
            <div key={user.id} style={{display: "flex", alignItems:"stretch"}}>
              <div>
              <Link to={"/users/" + user.id}>
                    <h4 style={
                      {color:"lightslategray", 
                      textTransform:"capitalize", 
                      display:"flex", 
                      justifyContent: "center"}
                    }>{user.username}</h4>
              </Link>
                    <div>
                    <img style={
                      {borderRadius: "50%",
                        border: "3px solid lightslategray"}
                    } src={user.profileImage} className="profile-avatar"/>
                    </div>
              </div>
              <UserImages userId={user.id}/>    
            </div>
          )

        })
       
    }
      </div>  
    )
    </div>
    );
}


export default HomePage;