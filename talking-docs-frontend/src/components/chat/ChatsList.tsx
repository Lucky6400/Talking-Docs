import {
    List,
    ListItem,
    Card,
    Typography,
    Spinner,
    Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { PdfList } from "../../common.types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { chatActions } from "../../services/chatSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";


const ChatsList: React.FC = () => {
    const [active, setActive] = useState(0);
    const [pdfList, setPdfList] = useState<PdfList[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(true);

    const token = localStorage.getItem("token");


    const getPdfs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/api/get-all-pdfs`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            //console.log(response)
            const data = await response.data;
            //console.log(data)
            if (data?.message === "Unauthorized") {
                localStorage.removeItem("token");
                navigate("/signin")
            }
            if (data && data?.length > 0) {
                setPdfList(data);
                dispatch(chatActions.setCurrent({
                    name: data[0].name,
                    sourceId: data[0].sourceId,
                    userId: data[0].userId
                }))
            }
        } catch (error) {
            // @ts-ignore
            if (error && error?.request && error.request?.status === 401) {
                localStorage.removeItem("token");
                navigate("/signin")
            }
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/signin")
        }
        getPdfs();
        //eslint-disable-next-line
    }, [])
    return (
        <Card
            style={{
                left: open ? 0 : -400
            }}
            className="md:w-96 w-full fixed z-40 md:static max-w-full max-h-full h-[89vh] md:h-[80vh] border border-gray-300">
            {!open && <div className="md:hidden fixed right-0 top-14">
                <Button
                    onClick={() => setOpen(p => !p)}
                    size="sm">
                    Chats
                </Button>
            </div>}

            {loading ?
                <div className="flex justify-center w-full h-full items-center">
                    <Spinner className="w-16 h-16" />
                </div>
                :
                <List>
                    {pdfList.length > 0 ? pdfList.map((pdf, i) => (
                        <ListItem key={pdf._id}
                            onClick={() => {
                                setActive(i);
                                dispatch(chatActions.setCurrent({
                                    name: pdf.name,
                                    sourceId: pdf.sourceId,
                                    userId: pdf.userId
                                }))
                                setOpen(p => !p)
                            }}
                            className={(i === active ? "bg-black/80" : "bg-white") + " focus:bg-black hover:bg-transparent"}>
                            <div>
                                <Typography variant="h6" className={i === active ? "text-white" : "text-black"}>
                                    {pdf.name}
                                </Typography>
                                <Typography variant="small" className="font-normal text-gray-500">
                                    {new Date(pdf.createdAt).toDateString()}
                                </Typography>
                            </div>
                        </ListItem>
                    ))
                        : <ListItem>
                            No Pdfs found!
                        </ListItem>
                    }

                </List>
            }

        </Card>
    );
}

export default ChatsList