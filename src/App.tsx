import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/component-library/header/header";
import { GenerateBrowserRouter } from "./helpers/generate-browser-router";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <GenerateBrowserRouter />
      </BrowserRouter>
    </div>
  );
};
