import Canvas from './components/Canvas';
import * as gameOfLife from './core/core';
import {useEffect, useState} from "react";
import Title from "./components/Title";
import {PauseIcon, PlayIcon, RefreshIcon} from '@heroicons/react/solid'
import SubTitle from "./components/SubTitle";

const App = () => {

    const [playing, setPlaying] = useState(false)
    const [trame, setTrame] = useState(0)
    const [speed, setSpeed] = useState(100)
    const [currentConfiguration, setCurrentConfiguration] = useState(gameOfLife.randomConfiguration())
    const [previousConfiguration, setPreviousConfiguration] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            if (playing) {
                setPreviousConfiguration(currentConfiguration)
                setCurrentConfiguration(gameOfLife.doTurn(currentConfiguration))
                setTrame(trame + 1)
            }
        }, 100);
        return () => clearInterval(interval);
    }, [currentConfiguration, previousConfiguration, playing, trame]);

    return (
        <div className="App">
            <div className="App-header">
                <Title>Le jeu de la vie</Title>
                <SubTitle>Trame : { trame }</SubTitle>
                <Canvas configuration={currentConfiguration} previousConfiguration={previousConfiguration}/>
                <div className="flex flex-row">
                    <RefreshIcon className="w-10 text-blue-500 hover:cursor-pointer"
                                 onClick={() => {
                                     setPreviousConfiguration(currentConfiguration);
                                     setCurrentConfiguration(gameOfLife.randomConfiguration());
                                     setTrame(0)
                                 }}/>
                    {playing ?
                        <PauseIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(false)}/>
                        :
                        <PlayIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(true)}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
