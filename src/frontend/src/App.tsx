import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { Level1DemoPage } from "./pages/Level1DemoPage";
import { Level2DashboardPage } from "./pages/Level2DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="demo/level-1" element={<Level1DemoPage />} />
        <Route path="demo/level-2" element={<Level2DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
