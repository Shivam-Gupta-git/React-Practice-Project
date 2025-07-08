import './App.css'
import ImageSlider from './Components/ImageSlider'

function App() {

  return (
    <>
     <ImageSlider
     url={"https://picsum.photos/v2/list"}
     page={'1'}
     limit={'5'} 
     ></ImageSlider>
    </>
  )
}

export default App;
