import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../views/Home";
import SignIn from "../views/Signin";
import SignUp from "../views/Signup";
import Profile from "../views/Profile";
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";
import Form from "../views/Form";
import Protected from "./protected";
import {
  isAuthenticated,
  handleVerificationProtected,
} from "../services/authentication";

const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Rotas protegidas */}
      <Route element={<Protected />}>
        <Route
          path="/"
          element={<Home />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="/profile"
          element={<Profile />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="/settings"
          element={<Settings />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="/form"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
      </Route>

      {/* Rotas públicas */}
      <Route
        path="/signin"
        element={<SignIn />}
        loader={() => isAuthenticated()}
      />
      <Route
        path="/signup"
        element={<SignUp />}
        loader={() => isAuthenticated()}
      />

      <Route
        path="*"
        element={<Navigate to="/" />}
        loader={() => isAuthenticated()}
      />
    </>
  )
);

const Index = () => {
  return <RouterProvider router={route} />;
};

export default Index;
