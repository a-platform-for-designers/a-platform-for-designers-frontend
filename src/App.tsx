import classes from "./App.module.scss";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
//import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className={classes.app}>
      <SignUpPage />
    </div>
  );
}

export default App;
