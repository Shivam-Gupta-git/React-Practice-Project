import "./App.css";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import FormListProvider from "../Storage/FormList-store";


function App() {
  return (
    <>
     <FormListProvider>
      <Header></Header>
      <Outlet></Outlet>
     </FormListProvider>

    </>
  );
}

export default App;
