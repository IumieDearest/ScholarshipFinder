// src/routes/context/AuthContext.jsx
//
// This is the "shared memory" of your app.
// Any component that needs to know WHO is logged in imports from here.
//
// Role.jsx reads:  const { user } = useContext(AuthContext)
// Login.jsx will:  call setUser(...) after a successful login
// Register.jsx will: call setUser(...) after a successful register

import { createContext, useState } from "react";

// 1. Create the context object (this is what other files import)
export const AuthContext = createContext(null);

// 2. Create the Provider — wrap your whole app in this so every
//    component can read the user from anywhere
export const AuthProvider = ({ children }) => {
  // user = null means "nobody is logged in"
  // user = { role: "student", name: "..." } means someone is logged in
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};