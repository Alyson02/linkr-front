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
import Hashtag from "./pages/Hashtag";
import UserPosts from "./pages/UserPosts";
import { TooltipProvider } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";
import Singup from "./pages/Signup";
import { ProtectedLayout } from "./components/ProtectedLayout";
import TopBar from "./components/TopBar";
import HashtagTimeline from "./pages/HashtagTimeline";

const ModalBackground = styled(BaseModalBackground)`
  background: rgba(255, 255, 255, 0.8);
`;

const WithNav = () => (
  <ProtectedLayout>
    <TopBar />
    <Outlet />
  </ProtectedLayout>
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
                <Route element={<TimeLine />} path="/timeline" />
                <Route element={<UserPosts />} path="/user/:id" />
                <Route element={<HashtagTimeline />} path="/hashtag/:hashtag" />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </ModalProvider>
  );
}
