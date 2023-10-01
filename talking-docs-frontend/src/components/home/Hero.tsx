import { Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    
    return (
        <div className="w-full flex-wrap gap-10 flex justify-center items-center">
            <div>
                <h1 className="text-2xl lg:my-4 lg:leading-snug lg:text-6xl w-full text-center font-bold text-black">
                    Welcome to Talking Docs: <br />
                    Give PDFs a voice with AI
                </h1>
                <Button onClick={() => {
                    if (!token) {
                        navigate("/signin");
                    } else {
                        navigate("/form");
                    }
                }}>
                    Get Started
                </Button>
            </div>

            <div>
                <p className="w-full text-center text-gray-500 my-3">
                    Powered by
                </p>
                <img className="max-w-full w-96 object-contain" src="https://ph-files.imgix.net/d8734355-803b-473d-837f-649176a5172e.png" alt="" />
            </div>
        </div>
    )
}

export default Hero