import axios from "axios";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users",
});


export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

    const [userData, SetUserData] = useState(authContext);

        const navigate = useNavigate();


    const handleRegister = async (name, username, password) => {
        try {
            const respons = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            if (respons.status === httpStatus.CREATED) {
                return respons.data.message;
            }

        } catch (err) {
            throw (err)
        }
    }

    const handleLogin = async (username , password) =>{
        try {
            let request = await client.post("/login" , {
                username : username ,
                password : password
            });

            if(request.status === httpStatus.OK){
                localStorage.setItem("token" , request.data.token);
                navigate("/home")
            }


            
        } catch (err) {
            throw err ; 
        }
    }


    const data = {
        userData,
        SetUserData,
        handleRegister,
        handleLogin,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}