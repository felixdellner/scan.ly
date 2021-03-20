import logo from './logo.svg';
import '@google/model-viewer';
import './App.css';

function App() {
  return (
    <div className="App">


          <div className= "rowItem">
            <h2>YOUR MRI REPORT</h2>
            <p className="dangerous">Disc 6 internal tear</p>
            <p className="warning">Disc 7 lumbic tear</p>
            <p className="normal">Disc 4 normal</p>
          </div>
          <div  className= "rowItem">
            <model-viewer className="modelDisplay" height="100vh" width="50vw"  src='spine2.glb' camera-controls auto-rotate/>
          </div>


    </div>
  );
}

export default App;
