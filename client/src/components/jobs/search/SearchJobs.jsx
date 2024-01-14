import { useState } from 'react'

import './searchJobs.css'

import { dummySearchRecommendationArray } from '../../../data/DummySearchRecommendation';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SearchJobs = ({searchClose}) => {

    const [searchVal, setSearchVal] = useState('')

    const [searchRecommendation, setSearchRecommendation] = useState(dummySearchRecommendationArray)

    return (
        <div className='fixed h-screen w-screen dark:bg-slate-900 dark:text-white flex flex-col z-20'>
            <div className="search-header h-20 w-full flex justify-between items-center px-2">
                <input
                    type='text'
                    placeholder='Search Jobs...'
                    className='w-4/5 h-3/5 rounded-xl dark:bg-slate-500 text-xl pl-2 focus:outline-none'
                />
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