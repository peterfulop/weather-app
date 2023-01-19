import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../components/pages/404/404';
import { DetailsPage } from '../components/pages/Details/details-page';
import { HomePage } from '../components/pages/Home/home-page';
import { MyRoutes } from '../enums/routes.enum';

const router = [
  {
    path: MyRoutes.HOME,
    element: <HomePage />,
  },
  {
    path: MyRoutes.DETAILS,
    element: <DetailsPage />,
  },
  {
    path: MyRoutes.NOT_FOUND,
    element: <NotFoundPage />,
  },
];

export const GenerateBrowserRouter = () => {
  return (
    <Routes>
      {router.map((rout, index) => (
        <Route key={index} path={rout.path} element={rout.element} />
      ))}
    </Routes>
  );
};
