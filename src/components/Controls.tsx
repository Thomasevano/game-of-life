import { RefreshIcon } from "@heroicons/react/solid";
import DimensionsInput from "./DimensionsInput";
import PlayPauseButton from './PlayPauseButton';
import Input from "./Input";

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

const Controls = ({ randomPattern, speed, setSpeed, playing, setPlaying, dimensions, setDimensions, cells, setCells }: ControlsProps) => {
  return (
    <div className="flex flex-row align-center items-center justify-center space-x-5">
      <RefreshIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => { randomPattern(cells, dimensions) }} />

      <PlayPauseButton playing={playing} setPlaying={setPlaying} />

      <Input value={speed} setValue={setSpeed} type="range" min={1} max={10} label="Speed" />

      <DimensionsInput setDimensions={setDimensions} />

      <Input value={cells} setValue={setCells} type="number" min={0} max={100000000} label="Cellules" />
    </div>
  )
}

export default Controls
