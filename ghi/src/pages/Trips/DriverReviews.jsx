import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

const DriverReviews = () => {
    const { baseUrl } = useAuthContext()
    const [rideReviews, setReviews] = useState([])

    const fetchReviews = async () => {
        const url = `${baseUrl}/api/reviews/mine`
        const response = await fetch(url, {credentials: 'include'})
        if (response.ok) {
            const data = await response.json()
            setReviews(data)
        } else {
            console.error('Failed to fetch your reviews')
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Your Driver Reviews</h5>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {rideReviews.map((review) => {
                        const reviewDateTime = review.date_time.slice(0, -3) + 'Z'
                        return (
                        <li key={review.id} className="list-group-item">
                            {`From ${review.pick_up_location} to ${review.drop_off_location} on
                            ${new Date(reviewDateTime).toLocaleDateString()} at
                            ${new Date(reviewDateTime).toLocaleTimeString()}
                            with a rating of ${review.rating}/5`}
                        </li>
                    )})}
                </ul>
            </div>
        </div>
    )
}

export default DriverReviews
