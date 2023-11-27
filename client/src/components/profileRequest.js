import axios from 'axios';
import React from 'react';

function ProfileRequestComp(props) {

    async function getAllPartners(){
        const partners = await axios.get('/user/partner')
        if(partners.data.success){
            return partners.data.body;
        }
        return [];
    }
    
    async function getAllSentPendingConn(){
        const requestList = await axios.get('/request/sent/user')
        if(requestList.data.success){
            return requestList.data.body;
        }
        return [];
    }

    async function getAllReceivedPendingConn(){
        const requestList = await axios.get('/request/received/user')
        if(requestList.data.success){
            return requestList.data.body;
        }
        return [];
    }

    async function acceptRequest(data){
        const response = await axios.post('/request/accept', data);
        if(response.data.success){
            return response.data.body;
        }
        console.error("Error occurred while accepting request ", response.data.error)
        return response.data.error;
    }

    async function cancelRequest(data){
        const response = await axios.post('/request/cancel', data);
        if(response.data.success){
            return response.data.body;
        }
        console.error("Error occurred while cancelling request ", response.data.error)
        return response.data.error;
    }


    return (
        <div>
            <p>In the profile request component</p>
        </div>
    );
}

export default ProfileRequestComp;