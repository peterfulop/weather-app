import { Link } from 'react-router-dom';
import { MyRoutes } from '../../../enums/routes.enum';
import './ErrorBlock.css';

export const ErrorBlock = (props: { message?: string; home?: boolean }) => {
  return (
    <div className='error-block'>
      <h2>Error!</h2>
      <p>Sorry, something went wrong!</p>
      {props.message && <small>{props.message}</small>}
      {props.home && (
        <Link className='back-to-home' to={MyRoutes.HOME}>
          HOME
        </Link>
      )}
    </div>
  );
};
