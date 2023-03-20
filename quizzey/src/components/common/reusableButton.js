import Button from 'react-bootstrap/Button';

const ReusableButton = (props) => {

    const {name, size, event, disable, type} = props;
    return ( 
        <Button size={size} disabled={disable} type={type} onClick={() => event()}>{name}</Button>

     );
}
 
export default ReusableButton;