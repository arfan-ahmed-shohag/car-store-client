import { Outlet } from "react-router";
import NavBar from "./pages/shared/NavBar";
import Footer from "./pages/shared/Footer";

function App() {
  return (
    <>
      <NavBar />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
