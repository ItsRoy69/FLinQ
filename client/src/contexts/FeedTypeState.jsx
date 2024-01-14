import { useEffect, useState } from "react"

import FeedTypeContext from "./FeedTypeContext.jsx"

const FeedTypeState = (props) => {

    const [selectedFeed, setSelectedFeed] = useState()

    useEffect(() => {
        const feedType = localStorage.getItem('feedType')
        if (feedType === null) {
            setSelectedFeed('recent')
        } else {
            setSelectedFeed(feedType)
        }
    }, [])

    const handleSelectFeed = (feedType) => {
        setSelectedFeed(feedType)
        localStorage.setItem('feedType', feedType)
    }

    return (
        <FeedTypeContext.Provider value={{selectedFeed, handleSelectFeed}}>
            {props.children}
        </FeedTypeContext.Provider>
    )
}

export default FeedTypeState