import classes from "./App.module.scss";
import SignUp from "./components/SignUp/SignUp";
//import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className={classes.app}>
      <SignUp />
    </div>
  );
}

export default App;
