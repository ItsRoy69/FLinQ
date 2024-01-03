import { useState } from 'react';
import './feedPostCard.css'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const FeedPostCard = ({post}) => {

    const [isLiked, setIsLiked] = useState(false)

    const TimeGap = (date) => {
        const postTime = new Date(date)
        const currTime = new Date()

        // year ago
        let yearsGap = currTime.getFullYear() - postTime.getFullYear()
        if (yearsGap > 0) {
            return `${yearsGap} years ago`
        }
        
        // months ago
        let monthsGap = currTime.getMonth() - postTime.getMonth()
        if (monthsGap > 0) {
            return `${monthsGap} months ago`
        }

        // weeks ago
        let daysGap = currTime.getDate() - postTime.getDate()
        if (daysGap > 7) {
            return `${daysGap / 7} weeks ago`
        }

        // days ago
        if (daysGap > 0) {
            return `${daysGap} days ago`
        }

        // hours ago
        let hoursGap = currTime.getHours() - postTime.getHours()
        if (hoursGap > 0) {
            return `${hoursGap} hours ago`
        }

        // minutes ago
        let minutesGap = currTime.getMinutes() - postTime.getMinutes()
        if (minutesGap > 0) {
            return `${minutesGap} minutes ago`
        }

        // seconds ago
        let secondsGap = currTime.getSeconds() - postTime.getSeconds()
        return `${secondsGap} seconds ago`
    }

    const handleLikePress = () => {
        setIsLiked(!isLiked)
    }

    return (
        <div className='feed-post-container h-60 sm:h-80 md:h-96 rounded-xl overflow-hidden flex flex-col'>
            <div className="feed-post h-5/6 bg-gradient-to-r from-fuchsia-950 to-purple-950 rounded-b-3xl">
                <div className="feed-post-header w-full h-1/5 flex justify-start sm:p-1">
                    <div className="feed-post-user flex justify-start items-center gap-3  h-full w-4/6 px-2">
                        <div className="feed-post-user-image rounded-full dark:bg-slate-700 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center border-2 dark:border-white text-xl sm:text-2xl">
                            {
                                (post.user.dp?.length > 0 ) ?
                                    <img src={post.user.dp}/>
                                : 
                                    <i className='bx bxs-user'></i>
                            }
                        </div>
                        <p className='truncate text-sm sm:text-lg'>{post.user}</p>
                    </div>
                    <div className="feed-post-header-utilities flex justify-end items-center gap-6 h-full w-2/6 ">
                        <p className='text-xs font-light'> 
                            {TimeGap(post.timestamp)}
                        </p>
                        <MoreVertOutlinedIcon className='dark:text-white'/>
                    </div>
                </div>
                <div className="feed-post-body w-full h-4/5 rounded-3xl object-cover overflow-hidden sm:max-h-fit">
                    <img className='w-full' src={post.image}/>
                </div>
            </div>
            <div className="feed-post-footer-utilities flex justify-between items-center w-full h-1/6 sm:py-2">
                <div className="feed-post-utils-set1 flex items-center gap-3 w-3/12 h-full px-2 text-3xl sm:text-5xl">
                    {
                        (!isLiked) ? 
                            <i 
                                className='bx bx-like' 
                                onClick={handleLikePress}
                            ></i>
                        : 
                            <i 
                                className='bx bxs-like' 
                                onClick={handleLikePress}
                            ></i>
                    }
                    <i className='bx bx-chat'></i>
                </div>
                <div className="feed-post-utils-set2 flex justify-end items-center gap-2 w-3/12 h-full px-2 text-3xl sm:text-5xl">
                    <i className='bx bx-send -rotate-45 pl-1'></i>
                    <i className='bx bx-bookmark-plus'></i>
                </div>
            </div>
        </div>
    )
}

export default FeedPostCard