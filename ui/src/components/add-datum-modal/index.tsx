import { Device } from "../../types";
import { formatKey } from "../../utils";
import "./style.css";

interface Props {
  device: Device;
  allFields: string[];
  onClose: () => void;
}

export default function AddDatumModal({ device, allFields, onClose }: Props) {
  async function submit(formData: FormData) {
    await fetch("http://localhost:3000/publish", {
      method: "post",
      body: JSON.stringify({
        topic: device[0],
        fields: Object.fromEntries(formData.entries()),
      }),
    });
    onClose();
  }

  return (
    <dialog className="add-datum-modal" open>
      <form action={submit}>
        <h1>Add datum for: {device[0]}</h1>
        {allFields.map((field) => (
          <p>
            <label>{formatKey(field)}</label>
            <input name={field} />
          </p>
        ))}
        <p className="actions">
          <button type="submit">Submit</button>
          <button type="reset" onClick={onClose}>
            Close
          </button>
        </p>
      </form>
    </dialog>
  );
}
