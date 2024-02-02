import { useEffect, useState } from 'react'

import './searchJobs.css'

import { dummyJobsSearchRecommendationArray, dummyEventsSearchRecommendationArray } from '../../data/DummySearchRecommendation';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SearchJobs = ({searchClose, feedType}) => {

    const [searchVal, setSearchVal] = useState('')

    const [searchRecommendation, setSearchRecommendation] = useState([])

    useEffect(() => {
        const searchBar = document.getElementById('search-bar')
        searchBar.focus()
    }, [])

    useEffect(() => {
        if (feedType === 'events') {
            setSearchRecommendation([...dummyEventsSearchRecommendationArray])
        } else if (feedType === 'jobs') {
            setSearchRecommendation([...dummyJobsSearchRecommendationArray])
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 h-screen w-screen dark:bg-custom-dark dark:text-white flex flex-col z-20'>
            <div className="search-header h-20 w-full flex justify-between items-center px-2">
                <div className="jobs-header-title w-full flex justify-start">
                    <input
                        id="search-bar"
                        type="text"
                        placeholder={`Search ${feedType}...`}
                        className="dark:bg-slate-800 rounded-3xl h-12 w-11/12 px-5 focus:outline-none focus:outline-purple-800"
                    />
                </div>
                <div 
                    className="close-button w-1/6 h-3/5 flex justify-center items-center"
                    onClick={searchClose}
                >
                    <CloseRoundedIcon 
                        fontSize='large'
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {
                    searchRecommendation.map((item, index) => (
                        <div className="h-14 w-full flex items-center px-3 rounded-2xl" key={index}>
                            <p className="text-sm font-light">
                                {item.search}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchJobs