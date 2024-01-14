import { useState, useEffect } from 'react'

import './alertIcon.css'

import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded'
import AlertWindow from '../../components/alert/AlertWindow'

const AlertIcon = () => {

    const [alertWindowOpen, setAlertWindowOpen] = useState(false)
    const [alertActive, setAlertActive] = useState(false)

    const handleAlertWindowOpen = () => {
        setAlertActive(true)
        setAlertWindowOpen(true)
    }

    return (
        <>
            <div
                className="header-alert w-10 h-10 rounded-full border border-red-600 flex justify-center items-center absolute right-4 dark:text-white dark:bg-red-900 hover:cursor-pointer"
                onClick={() => handleAlertWindowOpen()}
            >
                <GppMaybeRoundedIcon 
                    fontSize="large"
                    className="text-red-600"
                />
            </div>
            {
                (alertWindowOpen) && 
                    <AlertWindow
                        alertActive={alertActive}
                        setAlertActive={setAlertActive}
                        setAlertWindowOpen={setAlertWindowOpen}
                    />
            }
        </>
    )
}

export default AlertIcon