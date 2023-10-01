import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const DialogBox: React.FC<{ text: string, open: boolean, setOpen: (val: boolean) => void, title: string, status: string, navigate?: string }> = ({ text, open, setOpen, title, status, navigate }) => {

    const handleOpen = () => setOpen(!open);
    const navigation = useNavigate();
    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody divider>
                {text}
            </DialogBody>
            <DialogFooter>
                <Button variant="gradient" color={status === "Success" ? "green" : "red"} onClick={() => {
                    if (navigate) {
                        navigation(navigate);
                    } else {
                        handleOpen()
                    }
                }}>
                    <span>Close</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DialogBox