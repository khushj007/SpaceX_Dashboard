import StoreProvider from "@/Redux/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StoreProvider>{children}</StoreProvider>
      <ToastContainer />
    </div>
  );
}
