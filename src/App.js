import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import TimeLine from "./pages/Timeline";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<TimeLine />} path="/timeline" />
      </Routes>
    </BrowserRouter>
  );
}
