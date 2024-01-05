import Skeleton from "react-loading-skeleton"

const JobCardSkeleton = ({cards}) => {
    return Array(cards).fill(0).map((_, index) => (
        <div className="job-card-skeleton flex-shrink-0 flex-grow-0 flex flex-col justify-between w-64 h-44 rounded-3xl p-3 border border-blue-300" key={index}>
            <div className="job-card-skeleton-header w-full flex items-center gap-5">
                <div className="h-16 w-16 flex rounded-xl">
                    {/* <Skeleton /> */}
                    // logo
                </div>
                {/* <Skeleton/> */}
                // company name
            </div>
            
            <div className="job-card-skeleton-body w-full flex flex-col justify-evenly items-center">
                {/* <Skeleton count={2} /> */}
                // job role <br/>
                // if full time (type)
            </div>

            <div className="job-card-skeleton-footer w-full flex justify-end items-center px-4">
                {/* <Skeleton /> */}
                // Applied!
            </div>
       </div>
    ))
}

export default JobCardSkeleton