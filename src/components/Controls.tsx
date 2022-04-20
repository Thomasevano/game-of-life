import {PauseIcon, PlayIcon, RefreshIcon} from "@heroicons/react/solid";
import Text from "./Text";

type ControlsProps = {
    randomPattern: Function;
    speed: number;
    setSpeed: Function;
    playing: Boolean;
    setPlaying: Function;
    dimensions: number;
    setDimensions: Function;
    cells: number;
    setCells: Function;
}

const Controls = ({randomPattern, speed, setSpeed, playing, setPlaying, dimensions, setDimensions, cells, setCells}: ControlsProps) => {
    return (
        <div className="flex flex-row align-center items-center justify-center space-x-5">
            <RefreshIcon className="w-10 text-blue-500 hover:cursor-pointer"
                         onClick={() => {randomPattern(cells, dimensions)}}/>

            {playing ?
                <PauseIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(false)}/>
                :
                <PlayIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(true)}/>
            }

            <Text>Speed ({speed})<br /><input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} /> </Text>

            <Text>Dimensions<br />
                <select onChange={(e) => setDimensions(parseInt(e.target.value))}>
                    <option value="150">150x150</option>
                    <option value="300">300x300</option>
                    <option value="600">600x600</option>
                    <option value="1200">1200x1200</option>
                </select>
            </Text>

            <Text className="w-2/12">Cellules<br />
                <input className="w-full" type="number" min="0" value={cells} onChange={(e) => setCells(parseInt(e.target.value))} />
            </Text>
        </div>
    )
}

export default Controls