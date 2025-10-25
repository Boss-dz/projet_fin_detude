// import MyModel from "./component/MyModel";
import "./index.css";
// export default function App() {
//   return (
//     <div className="App">
//       <h2 className="test">TEST</h2>
//       <div className="model">
//         <MyModel />
//       </div>
//     </div>
//   );
// }

// src/App.js

import MyModel from "./component/MyModel";
import ImagePredictor from "./component/ImagePredictor.jsx";

export default function App() {
  return (
    <div className="app">
      <h2 className="title">Plant Disease Detector</h2>

      <div className="model">
        <MyModel />
      </div>
      <div>
        <ImagePredictor />
      </div>
    </div>
  );
}
