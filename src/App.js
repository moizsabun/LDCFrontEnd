import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import { Button, Image } from "react-bootstrap";

import ModalPopup from "./Components/ModalPopup";

function App() {
  console.log(window.location.origin);
  console.log(`${window.location.origin + "/Images/backgroundImage.jpg"}`);

  return (
    <>
      <Header></Header>
<div className="bg">

      {/* <Image
        src="/Images/backgroundImage.jpeg"
        style={{
          opacity: "0.3",
          width: "100vw",
          height: "100vh",
          position: "fixed",
        }}
      ></Image> */}
   
      <h1>Hello World</h1>
      <Button
        variant="primary"
        onClick={() => {
          console.log("clicked Inline Button");
        }}
      >
        Click here
      </Button>
      <ModalPopup></ModalPopup>
      </div>
    </>
  );
}

export default App;
