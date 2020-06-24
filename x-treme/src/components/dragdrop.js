//import DragAndDrop from './DragAndDrop'
//import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
////
////class FileList extends Component {
////state = {
////    files: [
////			//기본으로 들어있는 파일 리스트
////    ]
////  }
//// handleDrop = (files) => {
////    let fileList = this.state.files
////    for (var i = 0; i < files.length; i++) {
////      if (!files[i].name) return
////      fileList.push(files[i].name)
////    }
////    this.setState({files: fileList})
////  }
////render() {
////    return (
////      <DragAndDrop handleDrop={this.handleDrop}>
////        <div style={{height: 300, width: 250}}>
////          {this.state.files.map((file) =>
////            <div key={i}>{file}</div>
////          )}
////        </div>
////      </DragAndDrop>
////    )
////  }
////}
////export default FileList
//
//
//export default function DragDrop() {
//
//  return <div id="dragdrop">
//    <h2>test drag drop </h2>
//		photo_upload_modal();
//		
//  </div>;
//}
//
//function photo_upload_modal() {
//  const [show, setShow] = useState(false);
//
//  const handleClose = () => setShow(false);
//  const handleShow = () => setShow(true);
//
//  return (
//    <>
//      <Button variant="primary" onClick={handleShow}>
//        Upload picture
//      </Button>
//
//      <Modal show={show} onHide={handleClose}>
//        <Modal.Header closeButton>
//          <Modal.Title>Modal heading</Modal.Title>
//        </Modal.Header>
//        <Modal.Body>사진을 첨부해주세요</Modal.Body>
//        <Modal.Footer>
//          <Button variant="secondary" onClick={handleClose}>
//            Close
//          </Button>
//          <Button variant="primary" onClick={handleClose}>
//            Save Changes
//          </Button>
//        </Modal.Footer>
//      </Modal>
//    </>
//  );
//}

//import Reat from 'react';
//import './App.css';
//import DropZone from "./dropzone/DropZone";
//
//export default function DragDrop() {
//	return (
//			<div>
//					<p className="title">React Drag and Drop Image Upload</p>
//					<div className="content">
//							<DropZone />
//					</div>
//			</div>
//	);
//}
//export default DragDrop;