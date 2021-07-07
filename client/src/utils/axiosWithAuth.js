import axios from 'axios';

/******************************************************************************************************
 Build a module that creates a new instance of the axios object with the added functionality
    1.Define the base url for the API
    2.Include the auth token in the headers object
 
 *****************************************************************************************************/

 export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL:"http://localhost:5000/api",
        headers: {
            Authorization: token
        }
    });
 };