import { PauseIcon, PlayIcon } from "@heroicons/react/solid";

type playProps = {
  playing: Boolean
  setPlaying: Function;
}

const PlayPauseButton = ({ playing, setPlaying }: playProps) => {
  return (
    <>
      {playing ?
        <PauseIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(false)} />
        :
        <PlayIcon className="w-10 text-blue-500 hover:cursor-pointer" onClick={() => setPlaying(true)} />
      }
    </>
  )
}

export default PlayPauseButton
