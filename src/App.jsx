import React,{useRef} from 'react'
 import Sortingvis from "./Sortingvis"
 import Navbar from './Navbar'
import './App.css'
function App() {
   
  const apref = useRef();
  const [disablebtn,setdisabelbtn] = React.useState(false)
  const [slideval , setslideval] = React.useState(50)
  
   let bubblesort = ()=> apref.current.bubble()
   let selectionsort = ()=> apref.current. selection()
   let quci =()=> apref.current. quicksort()
   let mergesort  = ()=> apref.current.mergesort()
   let reset = ()=>apref.current.reset()
   
  return (

    <div className="App">
     
       <Navbar
         disablebtn = {disablebtn} 
         quick = {quci } 
         bubble={bubblesort}
         selection= {selectionsort} 
         mergesort = {mergesort}
         newarray = {reset} 
         setslidevalue= {(val)=>{setslideval(val)}} 
       />
      <Sortingvis
        handledisable={()=>{setdisabelbtn(prev=>!prev)}}  
        arrsize={slideval} ref={apref} 
      />

    </div>
  )
}

export default App
