import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
