import React, { useState } from 'react';
import './CSS/ReviewCarousel.css';

const reviews = [
    {
        id: 1,
        image: 'https://pyxis.nymag.com/v1/imgs/8fa/98e/3a01cd0da4f1558b478d5bf7a74e488f1d-05-evans-america.rsquare.w330.jpg',
        name: '	Steven Rogers',
        title: 'Soldier',
        quote: '"Hero Cab: dependable as my shield. Gets me where I need to be, fast & frustration-free." ',
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/750x/cc/25/94/cc259481cf5ab8f4fa3462f5603f613a.jpg',
        name: 'Hermione Granger',
        title: 'Witch',
        quote: '"Hero Cab is super muggle friendly, and even simpler than a charm! Perfect for busy witches on the go." ',
    },
    {
        id: 3,
        image: 'https://assetsio.reedpopcdn.com/spiderman_MDzjc1o.png?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp',
        name: 'Peter Parker',
        title: 'High School Student',
        quote: '"Hero Cab drivers are the real heroes! Nice folks, let me study between swings. A web-slinger needs brains too!" ',
    },
    {
        id: 4,
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5a6ed853-2d5e-45ed-af49-27ebead75f30/dfn5pmq-42d3fbee-9889-44ce-9df2-48048455ee9b.png/v1/fill/w_894,h_894,q_70,strp/_a_i_art__darth_vader_portrait_by_rockcodian_dfn5pmq-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzVhNmVkODUzLTJkNWUtNDVlZC1hZjQ5LTI3ZWJlYWQ3NWYzMFwvZGZuNXBtcS00MmQzZmJlZS05ODg5LTQ0Y2UtOWRmMi00ODA0ODQ1NWVlOWIucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.M9VbzI9WlMpGy7WFR_SLno6IKaoCTKWzWdhEX5Yyxrw',
        name: 'Anakin Skywalker',
        title: 'Sith Lord',
        quote: '"Forget TIE fighters. Hero Cab is fast, efficient. Reaches bacta tank in no time." ',
    },
]

const ReviewCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="gtco-testimonials">
            <h2>Hear from Our Customers</h2>
            <div className="owl-carousel owl-carousel1 owl-theme">
                {reviews.map((review, index) => (
                    <div
                        key={review.id}
                        className={`carousel-item ${
                            index === activeIndex ? 'active' : ''
                        }`}
                    >
                        <div className="card text-center">
                            <img
                                className="card-img-top"
                                src={review.image}
                                alt={review.name}
                            />
                            <div className="card-body">
                                <h5>
                                    {review.name} <br />
                                    <span>{review.title}</span>
                                </h5>
                                <p className="card-text">{review.quote}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carousel-indicators">
                {reviews.map((_, index) => (
                    <label
                        key={index}
                        className={`carousel-indicator ${
                            index === activeIndex ? 'active' : ''
                        }`}
                    >
                        <input
                            type="radio"
                            name="carousel-indicators"
                            checked={index === activeIndex}
                            onChange={() => setActiveIndex(index)}
                        />
                    </label>
                ))}
            </div>
        </div>
    )
}

export default ReviewCarousel
