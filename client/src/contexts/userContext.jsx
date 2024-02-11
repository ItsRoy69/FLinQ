import React, { useContext, useState, useRef } from 'react'

const UserContext = React.createContext()

export function UserProvider({ children }) {

    const [isuserreg, setisuserreg] = useState(true);
    const [isuser, setisuser] = useState(false);
 
    const value = {
        isuserreg,
        setisuserreg,
        isuser,
        setisuser,
    }
    const emptyUser = {
        email: "",
        password: "",
        username: "",
        address: "",
        phone: "",
        name: "",
        occupation: "",
    }
    const [user, setUser] = useState(emptyUser)

    const updateUser = (user) => {
        setUser({
            email : user.email,
            password: user.password,
            username : user.username,
            address:user.address,
            phone:user.phone,
            name:user.name,
            occupation:user.profession
        })

    }
    const logout = () => {
        setUser(emptyUser)
    }
    return (
        <UserContext.Provider value={{user, updateUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}

// export function userModal() {
//     return (useContext(UserContext))
// }
