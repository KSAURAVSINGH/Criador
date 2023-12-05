import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchUsersComp(props) {

    const [renderedContent, setRenderedContent] = useState(null);

    async function getAllUsers(){
        const users = await axios.get('/api/user/all');

        if(users.data.success){
            return users.data.body;
        }
        console.error("Error occurred while fetching all user details", users.data.error);
        return [];
    }

    async function getUserId(){
        const userId = await axios.get('/api/user/id');
        if(userId.data.success){
            return userId.data.body;
        }
        return null;
    }

    async function addConnection(data){
        const response = await axios.post('/api/request/add', data);
        if(response.data.success){
            return response.data.body;
        }
        console.error("Error occurred while adding connection: ", response.body.error)
        return response.body.error;
    }

    async function testFunction(){
        const userDetails = await getAllUsers();
        const userId = await getUserId();

        console.log("All Users :", userDetails );
        console.log("User Id: ", userId)

        return (
            <ul>
            {userDetails.map((user, index) => (
              <li key={index}>{user.email}</li>
            ))}
          </ul>
        )
    }

    useEffect(function(){
        const fetchData = async () => {
            const content = await testFunction();
            setRenderedContent(content);
        }   
        fetchData();
    },[])


    return (
        <div>
            <p>In the search component</p>
            <button onClick={testFunction}>Trigger</button>  
            <div>{renderedContent}</div>          
        </div>
    );
}

export default SearchUsersComp;