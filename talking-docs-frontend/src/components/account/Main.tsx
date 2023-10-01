import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard';
import { UserData } from '../../common.types';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';

const Main: React.FC = () => {
    const token = localStorage.getItem('token');

    const [userData, setUserData] = useState<UserData>({
        userId: "",
        username: "",
    });

    const getUser = async () => {
        try {
            const userRes = await axios.get(`${BASE_URL}/api/profile`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            const data = await userRes.data;
            setUserData(data)
            console.log(data)
        } catch (error) {
             // @ts-ignore
             if (error && error.request && error.request?.status === 401) {
                localStorage.removeItem("token");
                navigate("/signin")
            }
            console.log(error)
        }

    }
    const navigate = useNavigate();
    useEffect(() => {
        if(!token) {
            localStorage.removeItem('token');
            navigate("/signin");
        }
        getUser();
        //eslint-disable-next-line
    }, [])
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-5">
            <ProfileCard username={userData.username}/>
        </div>
    )
}

export default Main