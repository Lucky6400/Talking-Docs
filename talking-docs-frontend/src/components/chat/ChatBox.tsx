import { Card, IconButton, Spinner, Textarea, Typography } from '@material-tailwind/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import SendIcon from '../icons/SendIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import axios from 'axios'
import { Message, MsgPayload } from '../../common.types'
import moment from 'moment'
import { BASE_URL } from '../../constants'

const ChatBox: React.FC = () => {
    const currentChat = useSelector((s: RootState) => s.chatReducer);
    const sourceId = currentChat?.sourceId;
    const userId = currentChat?.userId;
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState<string>('');
    const [sendLoading, setSendLoading] = useState<boolean>(false);

    // console.log(sourceId)
    // console.log(userId)

    const getAllMessages = async () => {
        setLoading(true)
        try {
            const payload = {
                sourceId, userId
            }
            const response = await axios.post(`${BASE_URL}/api/get-all-messages`, payload, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.data;
            //console.log(data)
            setMessages(data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const sendMessage = async () => {
        setSendLoading(true)
        try {

            const arrayOfMessages = messages?.slice(-6)?.map((message) => {

                const obj: MsgPayload = {
                    role: message.from === userId ? 'user' : "assistant",
                    content: message.content
                };
                return obj
            });
            arrayOfMessages.push({
                role: 'user',
                content
            });

            setMessages((prev) => ([...prev, {
                _id: Date.now().toString() + 1,
                from: userId,
                to: sourceId,
                content: content,
                references: [],
                createdAt: new Date().toString()
            }]))

            const payload = {
                "from": userId,
                "to": sourceId,
                "content": arrayOfMessages
            }

            const response = await axios.post(`${BASE_URL}/api/send-message`, payload, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.data;

            if (data && data.message === "Success") {
                setMessages((prev) => ([...prev, {
                    _id: Date.now().toString(),
                    from: sourceId,
                    to: userId,
                    content: data.content,
                    references: data.references,
                    createdAt: new Date().toString(),
                }]))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setContent("");
            setSendLoading(false);
        }

    }

    //eslint-disable-next-line
    useEffect(() => { getAllMessages() }, [sourceId, userId])

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Function to scroll the chat container to the bottom
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // Use useEffect to scroll to the bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (
        <Card className="border h-[89vh] md:max-h-[80vh] w-full overflow-hidden z-20 relative bg-gray-300 border-gray-300 md:w-2/3">
            <div className="w-full absolute z-20 top-0 left-0 py-4 bg-white px-5 border-b border-gray-300">
                <Typography variant='h6' className="text-black">
                    {currentChat.name}
                </Typography>
            </div>
            <div ref={chatContainerRef} className="w-full h-[75%] pb-10 pt-20 px-4 mt-14 bg-gray-300 -z-10 overflow-y-scroll overflow-x-hidden">
                {loading ? <div className="w-full h-full flex justify-center items-center">
                    <Spinner className='w-16 h-16' />
                </div> : <>
                    {messages.length > 0 ?
                        messages.map((message) => (
                            <Fragment key={message._id}>
                                <div className={message.from === userId ? "relative bg-white text-black p-5 py-2 rounded-lg ml-auto md:max-w-[50%]" : "relative bg-black text-white mr-auto py-2 p-5 rounded-lg md:max-w-[50%] my-3"}>
                                    <p className='my-2'>
                                        {message.content}
                                    </p>

                                    <div className="flex w-full justify-between items-end">
                                        <p className="text-xs text-gray-500">
                                            {message.references?.length ? message.references?.map((ref) => (
                                                <p>
                                                    Page No: {ref.pageNumber}
                                                </p>
                                            ))
                                                :
                                                <span>
                                                    {message.from === userId ? "" : " No References"}
                                                </span>
                                            }
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {moment(message.createdAt).from(moment())}
                                        </p>
                                    </div>

                                </div>

                            </Fragment>
                        ))

                        : <div>
                            No messages yet!
                        </div>}
                    {sendLoading ? <div className="w-2 h-2 rounded-full ml-4 my-8 bg-red-500 relative animate-spin">
                        <div className="absolute inset-0 bg-white rounded-full transform rotate-0 translate-x-4 animate-spin"></div>
                        <div className="absolute inset-0 bg-white rounded-full transform rotate-0 -translate-x-4 animate-spin"></div>
                    </div> : <></>}
                </>}
            </div>
            <div className="w-full absolute bottom-6 z-20 left-0 px-3 flex">
                <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-100 p-2">

                    <Textarea
                        rows={1}
                        resize={true}
                        placeholder="Your Message"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="min-h-full !border-0 focus:border-transparent"
                        containerProps={{
                            className: "grid h-full",
                        }}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <div>
                        <IconButton
                            onClick={sendMessage}
                            variant="text" className="rounded-full">
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>

        </Card>
    )
}

export default ChatBox