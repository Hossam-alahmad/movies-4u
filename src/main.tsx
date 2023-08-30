import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
