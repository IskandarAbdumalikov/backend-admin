import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./context/index.js";
const App = lazy(() => import("./App.jsx"));
import LazyLoading from "./components/lazy/LazyLoading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LazyLoading />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
