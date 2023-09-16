import { ToastContainer } from "react-toastify";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Header />
      <Books />
      <ToastContainer />
    </div>
  );
};

export default App;
