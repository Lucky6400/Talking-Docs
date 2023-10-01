import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import FixedNavbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import DialogBox from "../components/common/Dialog";
import axios from "axios";
import { FormData, validation } from "../helpers/validation";
import Footer from "../components/common/Footer";
import { BASE_URL } from "../constants";



const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        tc: "false"
    });
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { tc, ...payload } = formData;

            const validate = validation(formData);
            if (!validate) {
                setText("Please fill all fields properly!")
                setTitle("Validation Error!");
                setStatus("Error");
                setOpen(true)
                return;
            }

            if (tc === 'false') {
                setText("Please check terms and conditions page!")
                setTitle("Validation Error!");
                setStatus("Error");
                setOpen(true)
                return;
            }
            const response = await axios.post(`${BASE_URL}/api/signup`, payload);
            const data = await response.data;
            if (data && data.message === "User registered successfully") {
                setText("You have successfully registered for Talking Docs! \n Now login and start chatting with your favorite PDFs🤩")
                setTitle("User Registered!");
                setStatus("Success");
                setOpen(true)
            }
        } catch (error) {
            setText("Something went wrong!")
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
    //console.log(formData.tc)
    return (
        <>
            <div className="flex justify-center items-center h-[80vh]">
                <FixedNavbar />
                <DialogBox open={open} setOpen={setOpen} text={text} title={title} status={status} navigate={status === "Success" ? "/signin" : undefined} />
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Enter your details to register.
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-sm text-gray-500">
                        Username should be atleast 5 characters long. <br />
                        Password should be atleast 8 characters long. <br />
                        Email address should be valid!
                    </Typography>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                name="username"
                                onChange={e => handleChange(e)}
                                crossOrigin="anonymous" size="lg" label="Username" />
                            <Input
                                name="email"
                                onChange={e => handleChange(e)}
                                crossOrigin="anonymous" size="lg" label="Email" />
                            <Input
                                name="password"
                                onChange={e => handleChange(e)}
                                crossOrigin="anonymous" type="password" size="lg" label="Password" />
                        </div>
                        <Checkbox
                            value={formData.tc}
                            onChange={(e) => setFormData(p => ({ ...p, tc: String(e.target.checked) }))}
                            crossOrigin="anonymous"
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <a
                                        href="#"
                                        className="font-medium transition-colors text-blue-700 hover:text-gray-900"
                                    >
                                        &nbsp;Terms and Conditions
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button type="submit"
                            disabled={loading}
                            className="mt-6 disabled:cursor-not-allowed disabled:bg-gray-700" fullWidth>
                            Register
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to="/signin" className="font-medium text-gray-900">
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
            <Footer />
        </>
    );
}

export default SignUp