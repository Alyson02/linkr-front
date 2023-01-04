import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<Home />} path="/timeline" />
      </Routes>
    </BrowserRouter>
  );
}
