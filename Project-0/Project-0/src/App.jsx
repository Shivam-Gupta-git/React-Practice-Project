
import ImgSlider from './components/ImgSlider'
import './App.css'

function App() {    

  return (
    <>
    <ImgSlider 
    url={"https://picsum.photos/v2/list"}
    page={'1'}
    limit={'5'}></ImgSlider> 
    </>
  )
}

export default App
