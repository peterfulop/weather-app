import { TfiControlBackward } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { MyRoutes } from "../../../enums/routes.enum";
import "./BackToHomeNav.css";
export const BackToHomeNav = () => {
  return (
    <div className="back-to-home-link">
      <Link to={MyRoutes.HOME}>
        <TfiControlBackward />
        {"HOME"}
      </Link>
    </div>
  );
};
