import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import { useEffect, useState } from 'react';
// import { adjustTextSize } from '../../utils/utils';



const ReusableModal = (props) => {
    const {show,
           hide, 
           title,
           body,
           fullScreen} = props;

    // const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     const handleWindowResize = () => {
    //         setInnerWidth(window.innerWidth);
    //     };
    //     window.addEventListener('resize', handleWindowResize);

    //     return() => {
    //         window.removeEventListener('resize', handleWindowResize);
    //     };
    // });

    return ( 
        <Modal
         show={show}
         onHide={hide}
         backdrop="static"
         aria-labelledby="contained-modal-title-vcenter"
         size="lg"
         centered
         fullscreen={fullScreen}
         scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body 
            // style={{fontSize: adjustTextSize(innerWidth)}} 
            >
                {body()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default ReusableModal;