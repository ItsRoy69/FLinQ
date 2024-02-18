import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [isuserreg, setisuserreg] = useState(true);
  const [isuser, setisuser] = useState(false);

  const value = {
    isuserreg,
    setisuserreg,
    isuser,
    setisuser,
  };
  const emptyUser = {
    _id: "",
    email: "",
    password: "",
    username: "",
    address: "",
    phone: "",
    name: "",
    occupation: "",
    gender: "",
    birthdate: "",
  };
  const [user, setUser] = useState({});

  const updateUser = (user) => {
    setUser({
      _id: user._id,
      email: user.email,
      password: user.password,
      username: user.username,
      address: user.address,
      phone: user.phone,
      name: user.name,
      occupation: user.occupation,
      gender: user.gender,
      birthdate: user.birthdate,
    });
  };

  useEffect(() => {
    updateUser(emptyUser);
  }, []);
  const logout = () => {
    setUser(emptyUser);
  };
  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// export function userModal() {
//     return (useContext(UserContext))
// }
