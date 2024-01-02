

import "./feed.css"

import FeedPostCard from "../../components/profile/FeedPostCard";

const Feed = () => {

	const dummyPostArr = [
		{
			user: "Samantha",
			image: "https://reductress.com/wp-content/uploads/2019/06/petite-woman-1-820x500.jpg"
		},
		{
			user: "Rose Williams",
			image: "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?cs=srgb&dl=pexels-pixabay-247322.jpg&fm=jpg"
		}
	]

	return (
		<>
			<div className="feed h-screen dark:bg-slate-900 p-4 flex flex-col justify-between items-center dark:text-white">
				<div className="welcome-section w-full flex justify-between items-center">
					<div className="welcome-nameshow flex flex-col border border-yellow-700 ">
						<div className="welcome-nameshow-name flex justify-between items-center truncate border border-red-500">
							<p className=" font-semibold">Hello Samita</p>
							<i className='bx bxs-bell'></i>
						</div>
						<p className="">Find your interests here!</p>
					</div>
					<div className="welcome-settings w-10 h-10 flex justify-center items-center border border-red-700 rounded-full">
						<i class='text-xl bx bxs-cog'></i>
					</div>
				</div>

				<div className="feed-container text-xl font-semibold overflow-auto">
					<p>Posts</p>
					{
						dummyPostArr.map((post, index) => (
							<FeedPostCard key={index} post={post}/>
						))
					}
				</div>
			</div>
		</>
	);
};

export default Feed;
