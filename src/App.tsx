import Canvas from './components/Canvas';
import { randomConfiguration, doTurn } from './core/core';
import { Configuration } from './core/core.types';
import { useEffect, useState } from "react";
import Title from "./components/Title";
import { PauseIcon, PlayIcon, RefreshIcon } from '@heroicons/react/solid'
import SubTitle from "./components/SubTitle";
import Text from "./components/Text";
function App() {

    const [playing, setPlaying] = useState(false)
    const [trame, setTrame] = useState(0)
    const [speed, setSpeed] = useState(3)
    const [currentConfiguration, setCurrentConfiguration] = useState<Configuration>(randomConfiguration())
    const [previousConfiguration, setPreviousConfiguration] = useState<Configuration>([])

    useEffect(() => {
        const interval = setInterval(() => {
            if (playing) {
                setPreviousConfiguration(currentConfiguration)
                setCurrentConfiguration(doTurn(currentConfiguration))
                setTrame(trame + 1)
            }
        }, (300/speed));
        return () => clearInterval(interval);
    }, [currentConfiguration, previousConfiguration, playing, trame, speed]);

    // Réinitialisation du jeu + régénération de pattern aléatoire
    function randomPattern() {
        setPreviousConfiguration(currentConfiguration);
        setCurrentConfiguration(randomConfiguration());
        setTrame(0)
    }

    return (
        <div className="App">
            <div className="App-header">
                <Title>Le jeu de la vie</Title>
                <SubTitle>Trame : {trame}</SubTitle>
                <Canvas configuration={currentConfiguration} previousConfiguration={previousConfiguration}/>
                    <div className="flex flex-row align-center items-center justify-start space-x-24">
                        <RefreshIcon className="w-10 text-blue-500 hover:cursor-pointer"
                                     onClick={() => {randomPattern()}}/>
                        {playing ?
                            <PauseIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(false)}/>
                            :
                            <PlayIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(true)}/>
                        }
                        <Text>Speed ({speed})<br /><input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} /> </Text>
                    </div>
            </div>
        </div>
    )
}

export default App
