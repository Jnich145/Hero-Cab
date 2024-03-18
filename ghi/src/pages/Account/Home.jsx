import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import ReviewCarousel from "/app/src/components/ReviewCarousel";
// import { useEffect, useState } from "react";

const Home = () => {
    const { token } = useAuthContext();
    // const [reviews, setReviews] = useState([])


    // const fetchData = async () => {
    //     const url = 'http://localhost:8000/api/reviews/'
    //     try {
    //         const response = await fetch(url, {credentials: "include"})
    //         if (response.ok) {
    //             const data = await response.json()
    //             setReviews(data)
    //         } else {
    //             console.error('Error:', response.status, response.statusText)
    //         }
    //     } catch (error) {
    //         console.error('Error', error.message)
    //     }
    // }

    // useEffect(() => {
    // fetchData()
    // }, [])

    return (
        <div>
            {!token ? (<h1>You are logged out</h1>) : (
                <ReviewCarousel />
            // <div className="my-5 container">
            //     <div className="offset-3 col-6">
            //         <table className="table table-striped">
            //             <thead>
            //                 <tr>
            //                     <th>date_time</th>
            //                     <th>rating</th>
            //                     <th>description</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 {reviews.map(review => {
            //                     return (
            //                         <tr key={review.id}>
            //                             <td>{review.date_time}</td>
            //                             <td>{review.rating}</td>
            //                             <td>{review.description}</td>
            //                         </tr>
            //                     )
            //                 })}
            //             </tbody>
            //         </table>
            //     </div>
            // </div>
            )}
        </div>
    )
};

export default Home;
