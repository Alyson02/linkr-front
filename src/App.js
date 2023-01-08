import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import SignIn from "./pages/SignIn";
import TimeLine from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";
import { TooltipProvider } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";
import Singup from "./pages/Signup";

const ModalBackground = styled(BaseModalBackground)`
  background: rgba(255, 255, 255, 0.8);
`;

export default function App() {
  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <TooltipProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route element={<SignIn />} path="/" />
            <Route element={<TimeLine />} path="/timeline" />
            <Route element={<UserPosts />} path="/user/:id" />
            <Route element={<Singup />} path="/signup" />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ModalProvider>
  );
}
