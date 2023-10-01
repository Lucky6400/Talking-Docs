
import React, { useEffect, useRef, useState } from 'react'
import AttachmentIcon from '../components/icons/Attachment';
import axios from 'axios';
import DialogBox from '../components/common/Dialog';
import FixedNavbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import Footer from '../components/common/Footer';
import { BASE_URL } from '../constants';

const Form: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/signin");
        //eslint-disable-next-line
    }, [])


    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        try {
            const formData = new FormData();
            const selectedFile = e.target.files ? e.target.files[0] : null;
            if (selectedFile) {
                const userRes = await axios.get(`${BASE_URL}/api/profile`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                const userData = await userRes.data;
                const userId = await userData?.userId;
                if (!userId) {
                    setText("Something went wrong!")
                    setTitle("Server Error!");
                    setStatus("Error");
                    setOpen(true)
                    return;
                }
                formData.append("file", selectedFile);
                formData.append("userId", userId);

                const response = await axios.post(`${BASE_URL}/api/upload-pdf`, formData);
                const data = await response.data;
                console.log(data)
                if (data?.message === "Unauthorized") {
                    localStorage.removeItem("token");
                    navigate("/signin")
                }
                if (data.message === "Success") {
                    setText("Your pdf is successfully uploaded!");
                    setTitle("Success");
                    setStatus("Success");
                    setOpen(true);
                }
            } else {
                console.log("Please select a file")
                setText("Please select a file!");
                setTitle("Empty File Error");
                setStatus("Error");
                setOpen(true);
            }
        } catch (error) {
            console.log(error)
            setText("Something went wrong!")
            setTitle("Server Error!");
            setStatus("Error");
            setOpen(true);
        } finally {
            setLoading(false);
            e.target.files = null;
        }
    }
    return (
        <>
            <FixedNavbar />
            <div className="w-full h-[80vh] justify-center">
                <div className="flex-col flex items-center w-full  gap-3">

                    <h1 className="text-2xl lg:my-4 lg:leading-snug lg:text-6xl w-full text-center font-bold text-black">
                        Upload your PDF file <br />
                        and start chatting!
                    </h1>
                    <input type="file"
                        disabled={loading}
                        ref={inputRef}
                        accept='.pdf'
                        onChange={handleFileChange}
                        className='w-7/12 hidden'
                    />
                    {loading ?
                        <div className="flex w-full justify-center">
                            <Spinner className='w-14 h-14' />
                        </div>
                        :
                        <div
                            onClick={() => inputRef.current?.click()}
                            className="flex cursor-pointer shadow-lg items-center gap-4 overflow-hidden w-full lg:w-7/12 border border-gray-300 rounded-md">
                            <div className="bg-black p-2 h-full text-white w-max">
                                <AttachmentIcon />
                            </div>
                            <div className="p-2">
                                Select a file to upload
                            </div>
                        </div>
                    }

                </div>
                <ul className="w-max mt-10 mx-auto text-sm flex flex-col gap-2 text-gray-600">
                    <li>File should not be more than 20MB</li>
                    <li>File should not be corrupt</li>
                    <li>File should not be password protected</li>
                </ul>

                <DialogBox open={open} setOpen={setOpen} text={text} title={title} status={status} navigate={status === "Success" ? '/chats' : undefined} />
            </div>
            <Footer />
        </>
    )
}

export default Form