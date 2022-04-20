import Canvas from './components/Canvas';
import * as gameOfLife from './core/core'

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h2>Le jeu de la Vie</h2>
      </header>
      <Canvas />
    </div>
  );
}

export default App;
