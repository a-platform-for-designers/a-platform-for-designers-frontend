import classes from "./App.module.scss";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className={classes.app}>
      Main <Footer />
    </div>
  );
}

export default App;
