import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

// function to ensure navigating to a new page scrolls you to the top
const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;