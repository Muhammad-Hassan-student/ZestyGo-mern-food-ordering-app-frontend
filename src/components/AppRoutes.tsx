import HomePage from "@/pages/HomePage";
import Layout from "../layout/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthCallBack } from "@/pages/AuthCallback";
import UserProfilePage from "@/pages/UserProfilePage";
import ProtectedRoute from "@/api/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallBack />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
