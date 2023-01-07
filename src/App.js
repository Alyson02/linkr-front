import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import SignIn from "./pages/SignIn";
import TimeLine from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";
import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";

const ModalBackground = styled(BaseModalBackground)`
  background: rgba(255, 255, 255, 0.8);
`

export default function App() {
  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route element={<SignIn />} path="/" />
          <Route element={<TimeLine />} path="/timeline" />
          <Route element={<UserPosts />} path='/user/:id' />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}
