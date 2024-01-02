import "./feed.css"

import FeedPostCard from "../../components/profile/FeedPostCard";

const Feed = () => {

	const dummyPostArray = [
		{	
			user: 'Samantha',
			image: 'https://reductress.com/wp-content/uploads/2019/06/petite-woman-1-820x500.jpg',
			timestamp: '18:30'
		},
		{
			user: 'Rose Williams',
			image: 'https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?cs=srgb&dl=pexels-pixabay-247322.jpg&fm=jpg',
			timestamp: '21:45'
		}
	]

	return (
		<>
			<div className="feed">
				<div className="feed-container">
					<p>Posts</p>
					{
						dummyPostArray.map((post, index) => (
							<FeedPostCard key={index} post={post}/>
						))
					}
				</div>
			</div>
		</>
	);
};

export default Feed;
