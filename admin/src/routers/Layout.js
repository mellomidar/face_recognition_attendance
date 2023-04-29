import { Outlet, Link } from "react-router-dom";
import "../App.css";
import homeIcon from "../assets/Home.png";
import registerIcon from "../assets/register.png";
import reportIcon from "../assets/report.png";
import crudIcon from "../assets/database.png";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li className="btn-list-item">
            <Link to="/">
              <img src={homeIcon} alt="home icon" className="icons" />
            </Link>
          </li>
          <li className="btn-list-item">
            <Link to="Register">
              <img src={registerIcon} alt="register icon" className="icons" />
            </Link>
          </li>
          <li className="btn-list-item">
            <Link to="Report">
              <img src={reportIcon} alt="report icon" className="icons" />
            </Link>
          </li>
          <li className="btn-list-item">
            <Link to={"CrudEmployee"}>
              <img src={crudIcon} alt="crud icon" className="icons "/>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
