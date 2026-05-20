import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {


  return (
    <>
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
    </>
  )
}

export default App
