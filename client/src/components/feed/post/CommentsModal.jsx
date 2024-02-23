import { useState, useEffect } from "react"

import CloseRounded from "@mui/icons-material/CloseRounded"

const CommentsModal = ({comments, addComment, setCommentsModalOpen}) => {
    
    useEffect(() => {
        console.log(comments)
    }, [])
    
    const [newComment, setNewComment] = useState('')

    const updateNewComment = (e) => {
        setNewComment(e.target.value)
    }

    const clearNewComment = () => {
        setNewComment('')
    }



    return (
        <div className="absolute top-0 left-0 h-screen w-screen border z-[90] bg-custom-dark flex flex-col">
            <div className="h-16 w-full border flex justify-between items-center px-8">
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
                    <div className="comment-section noscroll h-fit w-full overflow-auto">
                        {
                            comments?.map((comment, index) => {
                                return (
                                    <div className="" key={index}>
                                        {comment.content}
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            <div className="comment-footer absolute bottom-0 h-16 w-full border ">
                <input 
                    type="text"
                    className="h-full w-full outline-none focus:outline-fuchsia-900 bg-transparent rounded-xl text-white p-2"
                    onChange={updateNewComment}
                    value={newComment}
                />
                <div className="comment-send absolute right-2 border p-3">

                </div>
            </div>
        </div>
    )
}

export default CommentsModal