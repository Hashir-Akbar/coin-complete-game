"use client";
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode correctly
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const signIn = (token) => {
    setLoading(true);
    localStorage.setItem("authToken", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    localStorage.removeItem("authToken");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
