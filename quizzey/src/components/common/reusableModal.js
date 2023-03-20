import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const ReusableModal = (props) => {
    const {show,
           hide, 
           title,
           body} = props;

    return ( 
        <Modal
         show={show}
         onHide={hide}
         backdrop="static"
         aria-labelledby="contained-modal-title-vcenter"
         size="lg"
         centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default ReusableModal;