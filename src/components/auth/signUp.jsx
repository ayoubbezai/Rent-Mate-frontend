import React, { useState } from "react";
import { useAuth } from "../../states/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default to user
    const [error, setError] = useState(null);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await signUp(name, email, password, role);
        if (result.success) {

            navigate(`/${role}/dashboard`);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded-md">
                            <option value="user">User</option>
                            <option value="landlord">Landlord</option>
                        </select>
                    </div>
                    <button type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
