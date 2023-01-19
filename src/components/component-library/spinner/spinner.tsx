import Spinner from "react-bootstrap/Spinner";
import "./Spinner.css";
export const MySpinner = (props: { color: string }) => {
  return (
    <div className="spinner">
      <Spinner animation="border" role="status" variant={props.color}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
