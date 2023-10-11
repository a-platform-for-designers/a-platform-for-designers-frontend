import "./app.scss";

function App() {
  // lint error func
  if (0 < 0) {
    return;
  }

  return (
    <>
      <div className="app">SPA</div>
    </>
  );
}

export default App;
