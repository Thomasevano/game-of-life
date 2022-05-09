import DimensionsInput from "./DimensionsInput";
import PlayPauseButton from "./PlayPauseButton";
import Input from "./Input";

type ControlsProps = {
  speed: number;
  setSpeed: Function;
  playing: Boolean;
  setPlaying: Function;
  setDimensions: Function;
  cells: number;
  setCells: Function;
}

const Controls = ({ speed, setSpeed, playing, setPlaying, setDimensions, cells, setCells }: ControlsProps) => {
  return (
    <div className="flex flex-row align-center items-center justify-center space-x-5">

      <PlayPauseButton playing={playing} setPlaying={setPlaying} />

      <Input value={speed} setValue={setSpeed} type="range" min={1} max={10} label="Speed" />

      <DimensionsInput setDimensions={setDimensions} />

      <Input value={cells} setValue={setCells} type="number" min={0} max={100000} label="Cellules" />
    </div>
  )
}

export default Controls
