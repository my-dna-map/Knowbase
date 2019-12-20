import store from '../Store';

export default class Consultas {
static async  Post(Body,Url){
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + Url, {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + store.getState().userReducer.user.access_token
            },
            body:JSON.stringify( Body)
        });
        if (response.status !== 200) {
            throw new Error('Post response not valid');
            // return false;
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        return error;
    } 
 }

 static async  Delete(Body,Url){
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + Url, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + store.getState().userReducer.user.access_token
            },
           body:JSON.stringify( Body)
        });
        
        if (response.status !== 200) {
            throw new Error('Login response not valid');
            // return false;
        }
        const data = await response.json();
       // console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    } 
 }
 static async  Get(Url){
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + Url, {
            method: "Get",
            headers: {
                "Content-Type": "application/json"
            }
           // body:JSON.stringify( Body)
        });
        if (response.status !== 200) {
            throw new Error('Login response not valid');
            // return false;
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw new Error(error);
    } 
 }
 static async  Put(Body,Url){
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + Url, {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + store.getState().userReducer.user.access_token
            },
           body:JSON.stringify( Body)
        });
        if (response.status !== 200) {
            throw new Error('Login response not valid');
            // return false;
        }
        const data = await response.json();
        
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    } 
 }
}