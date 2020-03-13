import React, {useEffect, useState}from "react";
import axios from "axios";
import { useParams } from "react-router-dom" ;



const UserProfilePage = () => {
    const [images, setImages] = useState([])
    const [user, setUser] = useState([])
    const {id} = useParams()

    useEffect (() => {
        axios.get (`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
            .then((response) => {
                setImages(response.data)
            })
    }, [])

    useEffect (() => {
        axios.get (`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then((response) => {
            setUser(response.data)
        })
    })


  return (
    <div>
    <h3>{user.username}</h3>

    <img src ={user.profileImage} width="200px" height = "200px" />

    <div>

    {
        images.map((img) => {
            return <img src={img} width="100px" height="100px"/>
        })

    }

    </div>
    </div>
  )
}

export default UserProfilePage