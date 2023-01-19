import { Link } from 'react-router-dom';
import { MyRoutes } from '../../../enums/routes.enum';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className='not-found'>
      <h2>Page Not Found!</h2>
      <p>Return to the Home page:</p>
      <Link className='back-to-home' to={MyRoutes.HOME}>
        HOME
      </Link>
    </div>
  );
};
