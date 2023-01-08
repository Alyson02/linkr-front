import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import AuthProvider from "./contexts/auth";
import SignIn from "./pages/SignIn";
import TimeLine from "./pages/Timeline";
import Hashtag from "./pages/Hashtag";
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
           <AuthProvider>
          <Routes>
            <Route element={<SignIn />} path="/" />
            <Route element={<TimeLine />} path="/timeline" />
            <Route element={<Hashtag />} path="/hashtag/:hashtag" />
            <Route element={<UserPosts />} path="/user/:id" />
            <Route element={<Singup />} path="/signup" />
          </Routes>
           </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ModalProvider>
  );
}
