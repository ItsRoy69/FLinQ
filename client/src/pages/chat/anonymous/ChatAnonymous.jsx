import { useEffect, useState } from 'react'

import './chatAnonymous.css'

import { DummyChatAnonymousArray } from '../../../data/DummyChatAnonymous'

import ChatHeader from '../../../components/chat/chat-container/chat-header/ChatHeader'
import ChatBody from '../../../components/chat/chat-container/chat-body/ChatBody'
import ChatFooter from '../../../components/chat/chat-container/chat-footer/ChatFooter'

const ChatAnonymous = () => {

    const [chatArray, setChatArray] = useState([])

    useEffect(() => {
        setChatArray([...DummyChatAnonymousArray])
    }, [])

    const [isScrollingUp, setIsScrollingUp] = useState(false)

    return (
        <>
            <ChatHeader
                roomName={'Incognito Chat'}
            />
            <ChatBody
                chatArray={chatArray}
                setChatArray={setChatArray}
                isScrollingUp={isScrollingUp}
                setIsScrollingUp={setIsScrollingUp}
            />
            <ChatFooter
                chatArray={chatArray}
                setChatArray={setChatArray}
                setIsScrollingUp={setIsScrollingUp}
            />
        </>
    )
}

export default ChatAnonymous