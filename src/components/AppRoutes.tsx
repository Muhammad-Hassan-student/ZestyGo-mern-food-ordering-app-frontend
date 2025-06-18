import HomePage from "@/pages/HomePage";
import Layout from "../layout/layout";
import { Route, Routes } from "react-router-dom";
import { AuthCallBack } from "@/pages/AuthCallback";
import UserProfilePage from "@/pages/UserProfilePage";
import ProtectedRoute from "@/api/ProtectedRoute";
import ManageRestaurant from "@/pages/ManageRestaurant";
import NotFoundPage from "@/pages/PageNotFound";
import SearchPage from "@/pages/SearchPage";

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
      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurant />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
