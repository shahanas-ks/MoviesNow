import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { StrictMode } from "react";

// third-party
import { Provider as ReduxProvider } from "react-redux";

import { store } from "store";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
