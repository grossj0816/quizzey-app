import Button from 'react-bootstrap/Button';

const ReusableButton = (props) => {

    const {name, size, event, disable, type, variant} = props;
    return ( 
        <Button size={size} 
                disabled={disable} 
                type={type}  
                variant={variant}
                onClick={() => event()}>{name}</Button>

     );
}
 
export default ReusableButton;