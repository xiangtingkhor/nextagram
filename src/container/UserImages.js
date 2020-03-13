import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UserImages = (props) => {
    const {userId} = props
    const [images, setImages] = useState([])

      useEffect(() =>{
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
        .then(response => {
          setImages(response.data)
      })
      }, [])
 

    return (
        <div style= {
        {
      
          display:"flex",
          jusifyContent: "space-around",
          flexWrap: "wrap",
          margin: "auto",
          marginTop: "50px",
          marginLeft: "100px",
        }}>

        {
        images.map((img) => {
          return <img src={img} width={300} height={300}/> 
        })
        }
           
        </div>
    )
      }
    

export default UserImages;