//import Login from "./Components/login";
import { CssBaseline } from "@material-ui/core";
import { useState } from "react";
import AppContext from "./Components/AppContext";
import Login from "./Components/login";
import Masterdata from "./Components/Pages/Masterdata";
import 'bootstrap/dist/css/bootstrap.css';
import Signing from "./signing";
import  "./App.css";
function App() {
  let isAuthState = useState(false);
  return (
<>

  {/*<Masterdata></Masterdata> */}
<div className="App">
  <AppContext.Provider value={isAuthState}>
  <Login></Login>

</AppContext.Provider>
</div>


<CssBaseline></CssBaseline>
</>
  );
}

export default App;
