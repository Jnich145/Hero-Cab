import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import ReviewCarousel from "/app/src/components/ReviewCarousel";

const Home = () => {
    const { token } = useAuthContext();
    return <ReviewCarousel />
};

export default Home;
