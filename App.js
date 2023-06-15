import Navbar from './Component/Navbar';
import Bucketupload from './Component/Bucketupload';
import Footer from './Component/Footer';
import './App.css';

function Uplode(e) {
  console.log(e);
  const url = "https://tasktilltoday.s3.ap-south-1.amazonaws.com/2023-06-14-14-30-29-88501C967433FC7D";

  fetch(url, {
    method: "POST",
    mode: "cors",
        body: JSON.stringify({ key : "testing"}),
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    fetch(res.URL, {
      method: "POST",
      mode: "cors",
      body: e.target.files[0],
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  })
  .catch((err) => console.error(err));
}

function App() {
 
  return (
    <div className="App">
     <Navbar/>
    <div><Bucketupload/></div>
     <Footer/>
   </div>
  );}

export default App;
