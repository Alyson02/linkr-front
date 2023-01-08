import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import AuthProvider from "./contexts/auth";
import SignIn from "./pages/SignIn";
import TimeLine from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";
import { TooltipProvider } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";
import Singup from "./pages/Signup";
import { ProtectedLayout } from "./components/ProtectedLayout";
import TopBar from "./components/TopBar";

const ModalBackground = styled(BaseModalBackground)`
  background: rgba(255, 255, 255, 0.8);
`;

const WithNav = () => (
  <>
    <TopBar />
    <Outlet />
  </>
);

export default function App() {
  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <TooltipProvider>
        <AuthProvider>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route element={<SignIn />} path="/" />
              <Route element={<Singup />} path="/signup" />
              <Route element={<WithNav />}>
                <Route
                  element={
                    <ProtectedLayout>
                      <TimeLine />
                    </ProtectedLayout>
                  }
                  path="/timeline"
                />
                <Route
                  element={
                    <ProtectedLayout>
                      <UserPosts />
                    </ProtectedLayout>
                  }
                  path="/user/:id"
                />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </ModalProvider>
  );
}
