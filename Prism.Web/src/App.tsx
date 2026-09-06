import { SelectedClaimProvider } from "@/contexts/SelectedClaimContext";
import { AppShell } from "@/components/AppShell";
import { AuthProvider } from "@/lib/AuthContext";
import { RequireAuth } from "@/components/RequireAuth";
import { Login } from "@/pages/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <SelectedClaimProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          />
          <Route
            path="/paper/:paperId"
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          />
        </Routes>
      </SelectedClaimProvider>
    </AuthProvider>
  );
}

export default App;
