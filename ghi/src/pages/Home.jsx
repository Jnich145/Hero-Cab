import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1 className="text-3xl">Home</h1>
            <ul>
                <li>
                    <Link to={'/review/1'}>Review PVT Pile</Link>
                </li>
                <li>
                    <Link to={'/review/2'}>Review SGT Murphy</Link>
                </li>
            </ul>
        </>
    )
};

export default Home;
