import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [isuserreg, setisuserreg] = useState(true);
  const [isuser, setisuser] = useState(false);

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
  const [user, setUser] = useState(emptyUser);

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

  const logout = () => {
    setUser(emptyUser);
  };
  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
