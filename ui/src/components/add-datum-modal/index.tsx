import { Device } from "../../types";

interface Props {
  device: Device;
}

export default function AddDatumModal({ device }: Props) {
  function submit(formData: FormData) {
    console.log("submit", formData);
  }

  return (
    <form action={submit}>
      <p>Add datum for: {device[0]}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
