import "./App.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PostListProvider from "../Storage/PostList-store";
import { Outlet } from "react-router-dom";

function App() {


  return (
    <>
      <PostListProvider>
        <Header></Header>
        <Outlet />
        <Footer></Footer>
      </PostListProvider>
    </>
  );
}

export default App;
