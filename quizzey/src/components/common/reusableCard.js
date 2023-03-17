import Card from 'react-bootstrap/Card';
import { adjustTextWidth, adjustCardWidth } from '../../utils/utils';
import { useEffect, useState } from 'react';
import "./css/reusableCard.css";
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";



const ReusableCard = (props) => {

    const {title, 
           subtitle,
           badge, 
           text, 
           image, 
           courseLink,
           setLink} = props;
    const variant = "Light";
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);

        return() => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    
    return ( 
        <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{width: adjustCardWidth(innerWidth)}}
            className="mb-2 re-card"
        >
            <Card.Body>
                <Card.Title>{adjustTextWidth(innerWidth, title)}</Card.Title>
                {
                    subtitle &&
                    <Card.Subtitle className="mb-2 text-muted">
                        {subtitle}
                    </Card.Subtitle>
                }
                {
                    badge &&
                    <Card.Subtitle className="mb-2 text-muted">
                    {
                        badge &&
                        <Badge bg="secondary" text="light">
                            {badge}
                        </Badge>
                    }
                    </Card.Subtitle>

                }
                {
                    image ? <Card.Text id='re-cardText'>{image}&nbsp;&nbsp;{text}</Card.Text> : <Card.Text id='re-cardText'>{text}</Card.Text>
                }
                {
                    courseLink &&
                    <Link to={courseLink} className="boldLink">View Course</Link>

                }
                {
                    setLink &&
                    <Link to={setLink} className="boldLink">View Quizzey Set</Link>
                }
            </Card.Body>
        </Card>
     );
}
 
export default ReusableCard;