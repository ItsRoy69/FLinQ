import './feedPostCard.css'

const FeedPostCard = ({post}) => {
    return (
        <div className="feedpost-container w-full border border-yellow-400">
            <p>{post.user}</p>
            <div className="post-content h-[85%] w-full">
                <img className='border border-red-900 w-full' src={post.image}/>
            </div>
        </div>
    )
}

export default FeedPostCard