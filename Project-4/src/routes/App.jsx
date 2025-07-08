import "./App.css";
import Navbar from "../Components/Navbar";
import Phase1 from "../Components/Phase1";
import ContactListProvider from "../Storage/Contact_Store";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ContactListProvider>
        <div className="App-container">
          <Navbar></Navbar>
          <Phase1></Phase1>
          <Outlet></Outlet>
        </div>
      </ContactListProvider>
    </>
  );
}

export default App;
