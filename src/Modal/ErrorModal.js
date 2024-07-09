import Card from "../UI/Card";
import classes from "./ErrorModal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

function ModalOverlay(props) {
  return (
    <Card className={classes.overlay}>
      <header>{props.title}</header>
      <p>{props.message}</p>
      <footer>
        <button onClick={props.onClose}>Okay!</button>
      </footer>
    </Card>
  );
}

function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          title={props.title}
          message={props.message}
        />,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default ErrorModal;
