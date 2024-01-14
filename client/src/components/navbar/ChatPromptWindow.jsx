import { useEffect, useState } from 'react'

import './chatPromptWindow.css'

import ChatCommunityPrompt from './community-chat-prompt/ChatCommunityPrompt'

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const ChatPromptWindow = ({chatPromptWindowOpen, closeChatPromptWindow, handlePageSwitch}) => {

    // NECESSARY FOR NAVIGATION

    const handleOutsideClick = (e) => {
        if (!e.target.closest('#chat-prompt-box') 
                && !e.target.closest('#chat-community-prompt') 
                && !(e.target.closest('#back-to-chat-prompt')) 
                && !(e.target.closest('#add-community'))
                && !(e.target.closest('#add-community-text'))
                && !(e.target.closest('#add-community-icon'))
                && !(e.target.closest('#add-community-input'))
                && !(e.target.closest('#add-community-accept'))
                && !(e.target.closest('#add-community-cancel'))
            ) {
            document.removeEventListener('click', handleOutsideClick)
            closeChatPromptWindow()
        }
    }

    useEffect(() => {
        if (chatPromptWindowOpen) {
            setTimeout(() => {
                document.addEventListener('click', handleOutsideClick)
            }, 0)
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [chatPromptWindowOpen])

    const [chatCommunityPromptOpen, setChatCommunityPromptOpen] = useState(false)

    const handleChatCommunityPromptOpen = () => {
        setChatCommunityPromptOpen(true)
    }

    const handleChatCommunityPromptClose = () => {
        setChatCommunityPromptOpen(false)
    }

    return (
        <>
            <div
                className='w-screen h-[calc(100vh-3.5rem)] absolute bottom-14 left-0 flex flex-col justify-start items-center pt-20 z-10 backdrop-blur-xl overflow-hidden'
                
            >
                <div id='chat-prompt-box' className='w-full h-full dark:bg-custom-dark dark:text-white px-5 py-5 flex flex-col gap-4 rounded-t-3xl'>

                    <div className="chat-prompt-box-header flex items-center justify-between p-2">
                        <p className='text-2xl'>Choose an option</p>
                        <div 
                            className='h-10 w-10 flex items-center justify-center bg-gradient-to-tr from-fuchsia-600 to-pink-500 rounded-full hover:cursor-pointer'
                            onClick={closeChatPromptWindow}
                        >
                            <CloseRoundedIcon 
                                fontSize='large'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 overflow-y-auto'>
                        {
                            (chatCommunityPromptOpen) ?
                                (
                                    <ChatCommunityPrompt
                                        handlePageSwitch={handlePageSwitch}
                                        handleChatCommunityPromptClose={handleChatCommunityPromptClose}
                                    />
                                )
                            :
                                (
                                    <>
                                        <div 
                                            id='chat-community-prompt'
                                            className='w-full h-24 flex cursor-pointer bg-gradient-to-t from-slate-800 to-slate-700 rounded-2xl items-center justify-between py-2 px-4'
                                            onClick={() => handleChatCommunityPromptOpen()}
                                        >
                                            <div className="flex flex-col py-3 justify-between w-full h-full">
                                                <p className='text-xl'>Chat Community</p>
                                                <p className='text-sm'>Find your tribe...</p>
                                            </div>
                                            <GroupsRoundedIcon 
                                                fontSize='large'
                                            />
                                        </div>

                                        <div 
                                            className='w-full h-24 flex cursor-pointer bg-gradient-to-t from-slate-800 to-slate-700 rounded-2xl items-center justify-between py-2 px-4'
                                            onClick={() => handlePageSwitch('chat/aibot')}
                                        >
                                            <div className="flex flex-col py-3 justify-between w-full h-full">
                                                <p className='text-xl'>Chat with AI</p>
                                                <p className='text-sm'>She is your AI friend...</p>
                                            </div>
                                            <SmartToyRoundedIcon
                                                fontSize='large'
                                            />
                                        </div>

                                        <div 
                                            className='w-full h-24 flex cursor-pointer bg-gradient-to-t from-slate-800 to-slate-700 rounded-2xl items-center justify-between py-2 px-4'
                                            onClick={() => handlePageSwitch('chat/anonymous')}
                                        >
                                            <div className="flex flex-col py-3 justify-between w-full h-full">
                                                <p className='text-xl'>Chat Anonymously</p>
                                                <p className='text-sm'>Chat with your profile unrevealed...</p>
                                            </div>
                                            <NoAccountsRoundedIcon 
                                                fontSize='large'
                                            />
                                        </div>
                            
                                    </>
                                )
                        }
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default ChatPromptWindow