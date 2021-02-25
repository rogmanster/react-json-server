import "./styles.css";

import Fighters from "./components/Fighters";
import AddFighter from "./components/AddFighter";

function App() {
  return (
    <div>
      <Fighters />
      <AddFighter className="input" />
    </div>
  );
}

export default App;
