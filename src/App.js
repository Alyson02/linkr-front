import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import TimeLine from "./pages/Timeline";
import UserPosts from "./pages/UserPosts";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<TimeLine />} path="/timeline" />
        <Route element={<UserPosts />} path='/user/:id' />
      </Routes>
    </BrowserRouter>
  );
}
