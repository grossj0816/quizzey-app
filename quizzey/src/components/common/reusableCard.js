import Card from 'react-bootstrap/Card';
import { adjustTextWidth, adjustCardWidth } from '../../utils/utils';
import { useEffect, useState } from 'react';
import "./css/reusableCard.css";
import Badge from 'react-bootstrap/Badge';




const ReusableCard = (props) => {

    const {title, subtitle, badge, text, image} = props;
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

    // const avatar = createAvatar(botttsNeutral, {
    //     seed: "Elisa",
    //     flip: false,
    //     rotate: 0,
    //     size: 48,
    //     eyes: ["roundFrame02","robocop","eva"],
    //     face: ["round01", "square01"],
    //     dataUri: true
    // });


    
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
                <Card.Text id='cardText'>
                    {image}{'   '}{text}
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default ReusableCard;