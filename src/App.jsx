import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import initLocalization from "./i18n";

function App() {
  initLocalization();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="/chat/:uid" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

