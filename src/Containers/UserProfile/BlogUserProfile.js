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
            <h2>{userDetails.uuid} profile</h2>
            <table border="1" width="100%">
                <tbody>
                    <tr>
                        <td>UserName:</td>
                        <td>{userDetails.uuid}</td>
                    </tr>
                    <tr>
                        <td>First Name:</td>
                        <td>{userDetails.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{userDetails.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{userDetails.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BlogUserProfile;
