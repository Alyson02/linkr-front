import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [hashtag, setHashtag] = useState({});
  const [clickedOn, setClickedOn] = useState(false);
  // console.log(user)

  return (
    <AuthContext.Provider value={{ user, setUser, hashtag, setHashtag, clickedOn, setClickedOn}}>
      {children}
    </AuthContext.Provider>
  );
}