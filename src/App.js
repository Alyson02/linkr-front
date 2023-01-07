import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider } from "styled-react-modal"
import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";
import GlobalStyle from "./components/GlobalStyle";
import TimeLine from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";

const ModalBackground = styled(BaseModalBackground)`
  background: rgba(255, 255, 255, 0.8);
`


export default function App() {
  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
            <Route element={<TimeLine />} path="/timeline" />
            <Route element={<UserPosts />} path='/user/:id' />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}
