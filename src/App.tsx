import { Routes, Route } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import "./globals.css";

const App = () => (
  <main className="flex h-screen">
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>
      {/* PRIVATE ROUTES */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </main>
);

export default App;
