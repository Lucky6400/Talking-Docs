import React, { useEffect, useState } from 'react'
import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Spinner,
} from "@material-tailwind/react";
import TrashIcon from '../icons/TrashIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PdfList } from '../../common.types';
import { BASE_URL } from '../../constants';

const Main: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [pdfList, setPdfList] = useState<PdfList[]>([]);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const getPdfs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/api/get-all-pdfs`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            console.log(response)
            const data = await response.data;
            console.log(data)
            if (data?.message === "Unauthorized") {
                localStorage.removeItem("token");
                navigate("/signin")
            }
            if (data && data?.length > 0) {
                setPdfList(data);

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
    }, []);

    const deletePdf = async (id: string, sourceId: string) => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(`${BASE_URL}/api/delete-pdf/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: {
                    sourceId
                }
            });

            const data = await response.data;

            if (data && data.message === "Success") {
                const newPdfs = pdfList.filter(pdf => pdf._id !== id);
                setPdfList(newPdfs);
            }

        } catch (error) {
            console.log(error)
        } finally {
            setDeleteLoading(false)
        }
    }
    return (
        <Card className="w-full max-w-7xl min-h-[40vh] mx-auto pt-5">
            <h2 className="text-3xl font-semibold text-black w-full text-center">
                List of all your PDFs
            </h2>
            {loading ? <div className="w-full flex items-center justify-center">
                <Spinner className='w-16 h-16' />
            </div> :
                <List>
                    {pdfList.length > 0 ? pdfList.map((pdf) => (
                        <ListItem key={pdf._id} ripple={true} className="py-1 pr-1 pl-4">
                            {pdf.name}
                            <ListItemSuffix>
                                <IconButton
                                    onClick={() => deletePdf(pdf._id, pdf.sourceId)}
                                    disabled={deleteLoading}
                                    variant="text" color="blue-gray"
                                    className='disabled:cursor-not-allowed'
                                >
                                    <TrashIcon />
                                </IconButton>
                            </ListItemSuffix>
                        </ListItem>
                    )) : <div className="w-full text-center">
                        No PDFs found!
                    </div>}


                </List>
            }

        </Card>
    )
}

export default Main