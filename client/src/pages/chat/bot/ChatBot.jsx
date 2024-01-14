import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import './chatBot.css'

import MicRoundedIcon from '@mui/icons-material/MicRounded'

import { DummyAIChatArray } from '../../../data/DummyAiChat'
import SentMessage from '../../../components/chat/sent/SentMessage'
import ReceivedMessage from '../../../components/chat/received/ReceivedMessage'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

const ChatBot = () => {

    const [botChatArray, setBotChatArray] = useState([])

    useEffect(() => {
        setBotChatArray([...DummyAIChatArray])
    }, [])

    // NECESSARIES FOR NAVIGATION

    const navigate = useNavigate()

    const handleBackClick=() => {
		navigate(-1)
	}

    // NECESSARIES FOR STARTING THE CHAT UI FROM BOTTOM

    const [isScrollingUp, setIsScrollingUp] = useState(false)

    const chatContainerBodyRef = useRef(null)

    const showFromBottom = () => {
        chatContainerBodyRef.current.scrollTop = chatContainerBodyRef.current.scrollHeight
        // setTimeout(() => {
            document.removeEventListener('scroll', handleChatScroll)
            document.removeEventListener('wheel', handleChatScroll)
        // }, 1)   
    }

    useEffect(() => {
        showFromBottom()
    }, [botChatArray])

    const handleChatScroll = () => {
        if (chatContainerBodyRef.current.scrollHeight - chatContainerBodyRef.current.scrollTop > 700) {
            setIsScrollingUp(true)
        }
        else {
            setIsScrollingUp(false)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleChatScroll)
        document.addEventListener('wheel', handleChatScroll)
        return () => {
            document.removeEventListener('scroll', handleChatScroll)
            document.removeEventListener('wheel', handleChatScroll)
        }
    }, [])

    // NECESSARIES FOR SENDING QUERY

    const [queryInputVal, setQueryInputVal] = useState('')

    const handleQueryInputChange = (e) => {
        setQueryInputVal(e.target.value)
    }

    const sendQuery = () => {
        if (queryInputVal?.length > 0) {
            const date = new Date()
            const newMessage = {
                sender: 'You',
                text: `${queryInputVal}`,
                timestamp: `${date.getHours()}:${date.getMinutes()}` 
            }
            setBotChatArray([ ...botChatArray, newMessage ])
            setTimeout(() => {
                setQueryInputVal('')
                setIsScrollingUp(false)
            }, 1)
        }
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            sendQuery()
        }
    }

    useEffect(() => {
        const chatFooter = document.getElementById('chat-footer')
        chatFooter.addEventListener('keydown', handleEnterPress)
        return () => {
            chatFooter.removeEventListener('keydown', handleEnterPress)
        }
    }, [])

    return (
        <>
            <div className="chat-header fixed top-0 left-0 h-16 w-full dark:bg-custom-dark dark:text-white flex justify-between items-center px-4 z-10 border-b border-b-slate-600">
                <div 
					className="header-backarrow w-8 h-8 rounded-xl dark:bg-rose-500 flex justify-center items-center dark:text-slate-900 absolute"
					onClick={handleBackClick}
				>
                    <ArrowBackIcon />
                </div>
                <div className="jobs-header-title w-full flex justify-center">
                    <p className="text-2xl font-semibold">Helpyy</p>
                </div>
            </div>
            <div 
                id='chat-container-body' 
                className="chat-container flex flex-col gap-2 w-screen h-screen px-4 py-20 dark:bg-custom-dark dark:text-white overflow-y-auto"
                ref={chatContainerBodyRef}
            >
                {
                    botChatArray.map((message, index) => (
                        (message.sender === 'You') ?
                            <SentMessage message={message} key={index}/>
                        : 
                            <ReceivedMessage message={message} key={index}/>
                    ))
                }
            </div>
            {
                (isScrollingUp) &&
                    <div 
                        className="w-10 h-10 fixed bottom-24 right-8 border border-slate-600 rounded-full dark:bg-custom-dark dark:text-white flex items-center justify-center"
                        onClick={showFromBottom}    
                    >
                        <ArrowDownwardRoundedIcon/>
                    </div>
            } 
            <div id='chat-footer' className="chat-footer fixed bottom-0 left-0 w-full h-16 p-2 z-10 dark:bg-custom-dark flex items-center border-t border-t-slate-600">
                <input 
                    className='bg-gradient-to-b dark:from-gray-800 dark:to-slate-900 rounded-3xl h-full w-full border border-slate-600 focus:outline-none outline-purple-800 py-2 pl-4 pr-12 dark:text-white'
                    type="text" 
                    placeholder='Ask something...'
                    value={queryInputVal}
                    onChange={handleQueryInputChange}
                />
                {
                    (queryInputVal?.length > 0) ?
                        <div 
                            className="mic-container fixed right-3 w-10 h-10 dark:text-white  border-slate-600 flex items-center justify-center"
                            onClick={sendQuery}
                        >
                            <SendRoundedIcon/>
                        </div>
                    : 
                        <div 
                            className="mic-container fixed right-3 w-10 h-10 rounded-full dark:text-white border border-slate-600 flex items-center justify-center"
                        >
                            <MicRoundedIcon/>
                        </div>
                }
                
            </div>
        </>
    )
}

export default ChatBot