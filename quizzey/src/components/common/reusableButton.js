import Button from 'react-bootstrap/Button';

const ReusableButton = (props) => {

    const {name, size, event, disable} = props;
    return ( 
        <Button size={size} disabled={disable} onClick={() => event()}>{name}</Button>

     );
}
 
export default ReusableButton;