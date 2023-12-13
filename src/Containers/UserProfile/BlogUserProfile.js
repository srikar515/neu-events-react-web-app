import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HTTP } from './../../HTTP';
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:9002";

function BlogUserProfile() {
    const { uuid } = useParams();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const url = `${API_BASE}/profile/` + uuid;
                const response = await HTTP.get(url);
                if (response.status === 200) {
                    setUserDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // Handle errors, show message or set state accordingly
            }
        }

        fetchUserProfile();
    }, [uuid]);

    if (!userDetails) {
        return (
            <div>
                <h3>Error in fetching the data</h3>
            </div>
        );
    }

    return (
        <div>
            <h2>User Profile:</h2>
            <p>UserName: {userDetails.uuid}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            {/* Render other user details as needed */}
        </div>
    );
}

export default BlogUserProfile;
