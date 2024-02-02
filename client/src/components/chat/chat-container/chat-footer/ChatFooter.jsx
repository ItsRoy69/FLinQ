import { useState, useEffect } from 'react'

import './chatFooter.css'

import SendRoundedIcon from '@mui/icons-material/SendRounded'
import MicRoundedIcon from '@mui/icons-material/MicRounded'

const ChatFooter = ({setChatArray, chatArray, setIsScrollingUp}) => {

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
                timestamp: `${date.getHours()}:${(date.getMinutes().toString().length > 1) ? date.getMinutes() : `0${date.getMinutes()}` }` 
            }
            setChatArray([ ...chatArray, newMessage ])
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
    )
}

export default ChatFooter