import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({children}) {

    const [user, setUser] = useState({});
    const [hashtag, setHashtag] = useState({});

    return (
        <AuthContext.Provider value={{ user, setUser, hashtag, setHashtag }}>
            {children}
        </AuthContext.Provider>
    )

}