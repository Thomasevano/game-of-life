import Label from "./Label";

type dimensionsProps = {
  setDimensions: Function;
}

const DimensionsInput = ({ setDimensions }: dimensionsProps) => {
  return (
    <>
      <Label label="Dimensions" />
      <select onChange={(e) => setDimensions(parseInt(e.target.value))} className="text-blue-500">
        <option value="150">150x150</option>
        <option value="300">300x300</option>
        <option value="600">600x600</option>
        <option value="1200">1200x1200</option>
      </select>
    </>
  )
}

export default DimensionsInput
