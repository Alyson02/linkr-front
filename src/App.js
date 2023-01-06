import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import SignIn from "./pages/SignIn";
import TimeLine from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<SignIn />} path="/" />
        <Route element={<TimeLine />} path="/timeline" />
        <Route element={<UserPosts />} path='/user/:id' />
      </Routes>
    </BrowserRouter>
  );
}
