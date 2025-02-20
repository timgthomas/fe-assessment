import { useState } from "react";
import AddDatumModal from "../add-datum-modal";
import { Device } from "../../types";
import { formatKey, formatValue } from "../../utils";
import "./style.css";

interface Props {
  devices: Device[];
}

/** Gets a unique and sorted set of available device fields. */
function getAllFields(devices: Device[]): string[] {
  const byName = (lhs: string, rhs: string) => lhs.localeCompare(rhs);

  // A `Set` ensures unique values, at the cost of some readability
  return [
    ...new Set(devices.flatMap(([, fields]) => Object.keys(fields))),
  ].sort(byName);
}

function DeviceRow({
  device,
  allFields,
  onAddDatum,
}: {
  device: Device;
  allFields: string[];
  onAddDatum: (_: Device) => void;
}) {
  const [key, fields] = device;
  const [, id, name] = key.match(/^device\/(\d+)\/(.+)/i) ?? [];

  return (
    <tr key={`id-${id}`}>
      <th>{id}</th>
      <td>
        {name} {id}
      </td>
      {allFields.map((key) => (
        <td>{formatValue(fields[key])}</td>
      ))}
      <td>
        <button onClick={() => onAddDatum(device)}>Add</button>
      </td>
    </tr>
  );
}

export default function DeviceTable({ devices }: Props) {
  const [modalShown, showModalFor] = useState<Device | null>(null);

  const allFields = getAllFields(devices);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {allFields.map((key) => (
              <th key={`th-${key}`}>{formatKey(key)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <DeviceRow
              device={device}
              allFields={allFields}
              onAddDatum={showModalFor}
            />
          ))}
        </tbody>
      </table>
      {modalShown && (
        <AddDatumModal
          device={modalShown}
          allFields={allFields}
          onClose={() => showModalFor(null)}
        />
      )}
    </>
  );
}
