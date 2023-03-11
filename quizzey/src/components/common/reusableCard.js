import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

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
    

    const adjustCardWidth = (w) => {
        if (w >= 300 && w <= 640){
            return "22rem";
        }
        else if (w >= 641 && w <= 1007){ 
            return "20rem"; 
        }
        else{
            return "35rem";
        }
    }

    const adjustTextWidth = (width, text) => {
        if (width >= 300 && width <= 640){
            return text.slice(0,30) + "...";
        }
        else if (width >= 641 && width <= 1007){ 
            return text.slice(0,15) + "..."; 
        }
        else{
            console.log(text)
            return text;
        }
    }
    
    return ( 
        <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{width: adjustCardWidth(innerWidth)}}
            className="mb-2"
        >
            <Card.Body>
                <Card.Title>{adjustTextWidth(innerWidth, title)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{adjustTextWidth(innerWidth, subtitle)}</Card.Subtitle>
                <Card.Text>
                    {adjustTextWidth(innerWidth, text)}
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default ReusableCard;