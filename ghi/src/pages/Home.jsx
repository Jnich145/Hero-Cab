import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";

const Home = () => {
    const { token } = useAuthContext();
    const [reviews, setReviews] = useState([])


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/reviews/'
        try {
            const response = await fetch(url, {headers: { Authorization: `Bearer ${token}` }})
            if (response.ok) {
                const data = await response.json()
                setReviews(data[0])
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    useEffect(() => {
    fetchData()
    }, [])

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>date_time</th>
                            <th>rating</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                       <p>logged in</p>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Home;
