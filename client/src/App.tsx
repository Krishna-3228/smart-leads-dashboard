import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

function App() {


  return (
    <>
      <ThemeProvider>
        <AuthProvider >
          <AppRoutes />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,

              success: {
                style: {
                  background: "#16a34a",
                  color: "#fff",
                },
              },

              error: {
                style: {
                  background: "#dc2626",
                  color: "#fff",
                },
              },
            }}
          />
        </ AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
