import React, { useState, useContext, useEffect, createContext } from "react";

// API Base URL (from .env file)
const API_URL = "http://localhost:8000/api";

// Create authentication context
const AuthContext = createContext();

// Custom hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider Component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login function
    async function login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            console.log(response)

            const data = await response.json();
            if (!response.ok) {
                throw new Error("Invalid credentials");

            }

            setCurrentUser(data.user);
            setAuthToken(data.token); // Store token
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token); // Save token for persistence

            return { success: true, role: data.user.role.name };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.message };
        }
    }

    // Logout function
    function logout() {
        setCurrentUser(null);
        setAuthToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
    async function signUp(name, email, password, role_name = "user") {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role_name }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed");

            setCurrentUser(data.user);
            setAuthToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            return { success: true };
        } catch (error) {
            console.error("Sign-up error:", error);
            return { success: false, message: error.message };
        }
    }

    // Check for stored user & token on page load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setCurrentUser(JSON.parse(storedUser));
            setAuthToken(storedToken);
        }

        setLoading(false);
    }, []);

    // Provide authentication data
    const value = { currentUser, authToken, signUp,login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
