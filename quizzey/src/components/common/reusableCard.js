import Card from 'react-bootstrap/Card';
import { adjustTextWidth, adjustCardWidth } from '../../utils/utils';
import { useEffect, useState } from 'react';
import "./css/reusableCard.css";


const ReusableCard = (props) => {

    const {title, subtitle, text} = props;
    const variant = "Light";
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        // console.log(innerWidth);

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
                <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default ReusableCard;