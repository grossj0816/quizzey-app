import Card from 'react-bootstrap/Card';
import { adjustTextWidth, adjustCardWidth, adjustFlashCardMargins } from '../../utils/utils';
import { useEffect, useState } from 'react';
import "./css/reusableCard.css";
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import OverlayTrigger  from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';



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
            style={{width: adjustCardWidth(innerWidth), marginLeft: adjustFlashCardMargins(innerWidth)}}
            className="mb-2 re-card"
        >
            <Card.Body>
                <center>
                    <OverlayTrigger
                        placement="top"
                        delay={{show: 250, hide: 400}}
                        overlay={<Tooltip>{title}</Tooltip>}
                    >
                        <Card.Title><i>{adjustTextWidth(innerWidth, title)}</i></Card.Title>
                    </OverlayTrigger>
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
                            <Badge bg="secondary" text="light" pill>
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
                </center>
            </Card.Body>
        </Card>
     );
}
 
export default ReusableCard;