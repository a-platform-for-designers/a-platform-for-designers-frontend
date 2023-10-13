import classes from "./App.module.sass";
import Footer from "./components/footer/Footer";
import "./utils/vkbutton.ts";
import { redirectAuthHandler } from "./utils/vkbutton.ts";

function App() {
  return (
    <div className={classes.app}>
      <button onClick={redirectAuthHandler}>click me</button>
      Main <Footer />
    </div>
  );
}

export default App;
