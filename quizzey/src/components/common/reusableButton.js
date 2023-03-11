import Button from 'react-bootstrap/Button';

const ReusableButton = (props) => {

    const {name} = props;
    return ( 
        <Button size='sm'>{name}</Button>

     );
}
 
export default ReusableButton;