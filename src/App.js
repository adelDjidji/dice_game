import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import SettingsPanel from "./components/SettingsPanel"
import GameLayout from "./components/GameLayout"
function App() {
  const { maxScore } = useSelector(state => state.game.settings)

  
  return (
    <div className="App">
      {
        !maxScore && <div>
          <SettingsPanel/>
        </div>
      }
      {
        !!maxScore && <div>
          <GameLayout/>
        </div>
      }
    </div>
  );
}

export default App;
