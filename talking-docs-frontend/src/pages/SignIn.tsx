import React, { useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import FixedNavbar from '../components/common/Navbar';
import { FormData } from '../helpers/validation';
import axios from 'axios';
import DialogBox from '../components/common/Dialog';
import Footer from '../components/common/Footer';
import { BASE_URL } from '../constants';

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = formData;

            const response = await axios.post(`${BASE_URL}/api/signin`, payload);
            const data = await response.data;
            if (data && data.message === "Success") {
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch (error) {
            setText("Please check credentials and try again!")
            setTitle("Server Error!");
            setStatus("Error");
            setOpen(true)
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <>
            <div className="flex justify-center h-[80vh] items-center">
                <FixedNavbar />
                <DialogBox open={open} setOpen={setOpen} text={text} title={title} status={status} navigate={status === "Success" ? "/" : undefined} />
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Enter your details to sign in.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                name='username'
                                onChange={e => handleChange(e)}
                                crossOrigin="anonymous" size="lg" label="Username" />
                            <Input
                                name='password'
                                onChange={e => handleChange(e)}
                                crossOrigin="anonymous" type="password" size="lg" label="Password" />
                        </div>

                        <Button type="submit"
                            disabled={loading}
                            className="mt-6 disabled:cursor-not-allowed disabled:bg-gray-700" fullWidth>
                            Sign In
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-gray-900">
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
            <Footer />
        </>
    )
}

export default SignIn