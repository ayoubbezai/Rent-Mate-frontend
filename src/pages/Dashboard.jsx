import React from 'react'
import { useAuth } from '../states/AuthContext'; // Import auth context
const Dashboard = () => {
    const { logout } = useAuth();
    return (
        <div>
            hello admin

            <button onClick={logout} className='cursor-pointer'>logout</button>
        </div>
    )
}

export default Dashboard
