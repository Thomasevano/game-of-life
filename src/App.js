import Canvas from './components/Canvas';
import * as gameOfLife from './core/core';
import {useEffect, useState} from "react";

const App = () => {

    const [currentConfiguration, setCurrentConfiguration] = useState(gameOfLife.randomConfiguration())
    const [previousConfiguration, setPreviousConfiguration] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousConfiguration(currentConfiguration)
            setCurrentConfiguration(gameOfLife.doTurn(currentConfiguration))
        }, 100);
        return () => clearInterval(interval);
    }, [currentConfiguration, previousConfiguration]);

    return (
    <div className="App">
      <header className="App-header">
        <h2>Le jeu de la Vie</h2>
        <Canvas configuration={currentConfiguration} setConfiguration={setCurrentConfiguration} previousConfiguration={previousConfiguration} setPreviousConfiguration={setPreviousConfiguration} />
      </header>
    </div>
    );
}

export default App;
