import { HashRouter } from 'react-router-dom';
import { GenerateBrowserRouter } from './helpers/generate-browser-router';

export const App = () => {
  return (
    <div className='App'>
      <HashRouter>
        <GenerateBrowserRouter />
      </HashRouter>
    </div>
  );
};
