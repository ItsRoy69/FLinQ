import React, { useContext, useState, useRef } from 'react'

const UserContext = React.createContext()

export function UserProvider({ children }) {

    const [openauthmodal, setopenauthmodal] = useState(false);
    const [openprofmodal, setopenprofmodal] = useState(false);
    const [isuserreg, setisuserreg] = useState(true);
    const [isuser, setisuser] = useState(false);
    const [isprofreg, setisprofreg] = useState(true);



    const value = {
        openauthmodal,
        setopenauthmodal,
        isuserreg,
        setisuserreg,
        isuser,
        setisuser,
        isprofreg,
        setisprofreg


    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function userModal() {
    return (useContext(UserContext))
}