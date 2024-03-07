import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const ReviewDetails = () => {
    const params = useParams();
    const [review, setReview] = useState({});

    useEffect(() => {
        const fetchReview = async () => {
            const url = `${import.meta.env.VITE_API_HOST}/api/review/${params.id}`
            const res = await fetch(url);
            const data = await res.json();
            setReview(data);
        }
        fetchReview();
    }, []);

    return (
    <h1 className="text-3xl">{review?.id}</h1>
    )
}

export default ReviewDetails;
