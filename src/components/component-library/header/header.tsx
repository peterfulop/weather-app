import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";

import { MyRoutes } from "../../../enums/routes.enum";
import "./Header.css";
export const Header = () => {
  return (
    <header>
      <div className="content">
        <h2>My Weather App</h2>
        <Link to={MyRoutes.HOME}>
          <TiWeatherPartlySunny
            color="white"
            size={40}
            style={{ margin: 10 }}
          />
        </Link>
      </div>
    </header>
  );
};
