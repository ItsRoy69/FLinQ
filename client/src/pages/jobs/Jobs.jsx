import './jobs.css'

import { dummyRecommendationsArray } from '../../data/DummyRecommendations'
import { dummyLatestJobsArray } from '../../data/DummyLatestJobs'
import { dummySavedJobsArray } from '../../data/DummySavedJobs'

import JobsRecommendation from '../../components/jobs/recommendations/JobsRecommendation'
import LatestJobCard from '../../components/jobs/latests/LatestJobCard'
import SavedJobCard from '../../components/jobs/saved/SavedJobCard'

import AddRounded from '@mui/icons-material/AddRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Jobs = () => {
    return (
        <>
            <div className='jobs-header dark:bg-slate-900 dark:text-white fixed top-0 left-0 h-16 w-full flex items-center px-4'> 
                <div className="header-backarrow w-8 h-8 rounded-xl dark:bg-rose-500 flex justify-center items-center dark:text-slate-900 absolute">
                    <ArrowBackIcon/>
                </div>
                <div className="jobs-header-title w-full flex justify-center">
                    <p className='text-2xl font-semibold'>Jobs</p>
                </div>
            </div>

            <div className="jobs-body dark:bg-slate-900 dark:text-white min-h-screen h-fit py-14 px-2 flex flex-col gap-3 items-center overflow-auto">
                <div className="jobs-recommendation flex flex-col w-full h-60 px-1 py-5 gap-3">
                    <div className="recommendation-title text-sm font-sm">
                        <p className='text-left text-lg font-semibold'>
                            Recommendations
                        </p>
                    </div>
                    <div className="recommendation-container h-full flex gap-5 overflow-x-auto">
                        {
                            dummyRecommendationsArray.map((recommentation, index) => (
                                <JobsRecommendation key={index} job={recommentation}/>
                            ))
                        }
                    </div>
                </div>
                <div className="jobs-saved flex flex-col w-full h-60 px-1 pb-5 gap-2">
                    <div className="saved-title text-sm font-sm">
                        <p className='text-left text-lg font-semibold'>Saved Jobs</p>
                    </div>
                    <div className="saved-container w-full h-full flex items-center gap-2 overflow-x-auto">
                        {
                            dummySavedJobsArray.map((job, index) => (
                                <SavedJobCard key={index} job={job}/>
                            ))
                        }
                    </div>
                </div>
                <div className="jobs-latest flex flex-col w-full h-60 px-1 pb-5 gap-2">
                    <div className="latest-title text-sm font-sm">
                        <p className='text-left text-lg font-semibold'>Recently Added</p>
                    </div>
                    <div className="latest-container w-full h-full flex items-center gap-2 overflow-x-auto">
                        {
                            dummyLatestJobsArray.map((job, index) => (
                                <LatestJobCard key={index} job={job}/>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="jobs-footer dark:bg-slate-900 dark:text-white fixed bottom-0 right-0 h-16 w-full flex justify-center items-center z-10">
                <div className="job-postnew h-4/5 w-11/12 flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600 hover:cursor-pointer">
                    <AddRounded
                        fontSize='large'
                    />
                    <p className='font-medium text-2xl'>Post Job</p>
                </div>
            </div>
        </>
    )
}

export default Jobs