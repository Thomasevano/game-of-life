import Canvas from './components/Canvas';
import { randomConfiguration, doTurn } from './core/core';
import { Configuration } from './core/core.types';
import { useEffect, useRef, useState } from "react";
import Title from "./components/Title";
import SubTitle from "./components/SubTitle";
import Controls from "./components/Controls";

function App() {
  const [playing, setPlaying] = useState(false)
  const [trame, setTrame] = useState(0)
  const [speed, setSpeed] = useState(3)
  const [dimensions, setDimensions] = useState(150)
  const [cells, setCells] = useState(500)
  const [currentConfiguration, setCurrentConfiguration] = useState<Configuration>(randomConfiguration())
  const previousGenerationRef = useRef<Configuration>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        previousGenerationRef.current = currentConfiguration;
        setCurrentConfiguration(doTurn(currentConfiguration))
        setTrame(trame + 1)
      }
    }, (300 / speed));
    return () => clearInterval(interval);
  }, [currentConfiguration, playing, trame, speed]);

  // Réinitialisation du jeu + régénération de pattern aléatoire
  useEffect(() => {
    previousGenerationRef.current = currentConfiguration;
    setCurrentConfiguration(randomConfiguration(cells, dimensions));
    setTrame(0)
  }, [cells])

  return (
    <div className="App">
      <div className="App-header">
        <Title>Le jeu de la vie</Title>
        <SubTitle>Trame : {trame}</SubTitle>
        <Canvas configuration={currentConfiguration} previousGenerationRef={previousGenerationRef.current} dimensions={dimensions} trame={trame} />
        <Controls
          speed={speed}
          setSpeed={setSpeed}
          playing={playing}
          setPlaying={setPlaying}
          setDimensions={setDimensions}
          cells={cells}
          setCells={setCells}
        />
      </div>
    </div>
  )
}

export default App
