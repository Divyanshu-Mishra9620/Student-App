import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Layout from "./features/Layout";
import DashboardPage from "./pages/Dashboard";
import StudentsPage from "./pages/Student";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn}>
                  <DashboardPage />
                </Layout>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route
            path="/students"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn}>
                  <StudentsPage />
                </Layout>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="*"
            element={<Navigate replace to={isLoggedIn ? "/" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "1px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "14px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
