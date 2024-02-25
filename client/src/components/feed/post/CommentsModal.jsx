import { useState, useEffect, useContext } from "react"
import axios from "axios"

import { UserContext } from "../../../contexts/userContext"

import CloseRounded from "@mui/icons-material/CloseRounded"
import SendRoundedIcon from "@mui/icons-material/SendRounded"

const CommentsModal = ({ postId, comments, refreshComments, setCommentsModalOpen }) => {

    // const { user } = useContext(UserContext)
    const [ user, setUser ] = useState({})
    
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])
    
    const [newComment, setNewComment] = useState('')
    const [replyingTo, setReplyingTo] = useState(null)

    const handleChangeReplyingTo = (commentId) => {
        if (replyingTo === commentId) {
            setReplyingTo(null)
        } else {
            setReplyingTo(commentId)
        }
    }

    const updateNewComment = (e) => {
        setNewComment(e.target.value)
    }

    const clearNewComment = () => {
        setNewComment('')
        setReplyingTo(null)
    }

    const handleSendComment = async() => {
        if (!replyingTo) {
            try {
                const response = await axios.post(`https://flinq-backend.onrender.com/post/${postId}/comment`, { 
                    userId: user._id,
                    username: user.username,
                    text: newComment 
                })
                console.log(response.data.result)
                clearNewComment()
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const response = await axios.post(`https://flinq-backend.onrender.com/post/${postId}/comment/${replyingTo}/reply`, { 
                    userId: user._id,
                    username: user.username,
                    text: newComment 
                })
                console.log(response.data.result)
                clearNewComment()
            } catch (err) {
                console.log(err)
            }
        }   
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' || e.key === 'enter') {
            handleSendComment()
        }
    }

    return (
        <div className="absolute top-0 left-0 h-screen w-screen z-[90] bg-custom-dark flex flex-col overflow-auto">
            <div className="h-16 w-full flex justify-between items-center px-8 fixed top-0 z-20 bg-custom-dark">
                <span className='text-xl'>Comments</span>
                <span
                    className="p-2 rounded-md bg-red-400 text-slate-900 cursor-pointer active:scale-105"
                    onClick={() => setCommentsModalOpen(false)}
                >
                    <CloseRounded/>
                </span>
            </div>
            {
                (comments?.length === 0) ?
                    <span className="text-lg">No comments to show.</span>
                :
                    <div className="comment-section noscroll absolute top-16 min-h-fit w-full overflow-auto flex flex-col gap-2 items-center pb-20 px-2">
                        {
                            comments?.map((comment, index) => {
                                return (
                                    <div className="min-h-fit relative w-full py-5 px-10 flex items-center bg-slate-800 opacity-90 rounded-lg" key={index}>
                                        <span className="font-bold mr-2">{comment.username}</span>
                                        {comment.text}
                                        <div 
                                            className="absolute right-8 text-blue-600"
                                            onClick={() => handleChangeReplyingTo(comment._id)}
                                        >
                                            {
                                                (comment._id === replyingTo) ?
                                                    <span>Replying</span>
                                                :
                                                    <span>Reply</span>
                                            }
                                        </div>
                                        <div className="pl-10 flex flex-col gap-2 bg-slate-700 rounded-lg m-2">
                                            {
                                                comment.replies.map((reply, index2) => {
                                                    return (
                                                        <div className="" key={index2}>
                                                            <span className="font-bold mr-2">{reply.username}</span>
                                                            {reply.text}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            <div className="comment-footer fixed bottom-0 h-16 w-full flex items-center p-2 z-20 bg-custom-dark">
                <input 
                    type="text"
                    className="h-full w-full outline-none outline-fuchsia-700 focus:outline-fuchsia-900 bg-transparent rounded-xl text-white p-2 pr-[56px]"
                    onChange={updateNewComment}
                    value={newComment}
                    onKeyDown={handleEnterPress}
                />
                <div 
                    className="comment-send absolute right-[10px] p-2 flex justify-center items-center text-white z-20 rounded-xl bg-pink-600 active:bg-fuchsia-800 active:scale-110"
                    onClick={() => handleSendComment()}
                >
                    <SendRoundedIcon/>
                </div>
            </div>
        </div>
    )
}

export default CommentsModal