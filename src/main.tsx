import ModalWrapper from "@/components/common/ModalWrapper.tsx";
import { AppWrapper } from "@/components/common/PageMeta.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import "flatpickr/dist/flatpickr.css";
import { createRoot } from "react-dom/client";
import "swiper/swiper-bundle.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider>
    <AppWrapper>
      <App />
      <ModalWrapper />
    </AppWrapper>
  </ThemeProvider>
  // </StrictMode>
);
