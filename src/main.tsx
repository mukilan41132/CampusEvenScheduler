import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
 
// PrimeReact core styles
import "primereact/resources/themes/lara-light-blue/theme.css"; // theme (choose one)
import "primereact/resources/primereact.min.css"; // core css

// PrimeIcons
import "primeicons/primeicons.css";

// PrimeFlex (optional but useful for layout)
import "primeflex/primeflex.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
