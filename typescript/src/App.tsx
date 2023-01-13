import "./App.css";
import FunctionProps from "./components/FunctionProps";
import Functions from "./components/Functions";

function App() {
  const handleOnclick = () => {
    console.log("clicked");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typescript usage examples</h1>
        <Functions></Functions>
        <FunctionProps
          isLoggedIn={true}
          count={20}
          title="Hello"
          status="waiting"
          onClick={handleOnclick}
        ></FunctionProps>
      </header>
    </div>
  );
}

export default App;
