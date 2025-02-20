import { Device, MqttValue } from "../../types";
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

/** "Translates" a field key into something more human-readable. */
function formatKey(key: string) {
  return key.split("_").join(" ");
}

function formatValue(value: MqttValue) {
  if (typeof value === "boolean") {
    return value ? "🟥" : "🟢";
  }

  return value;
}

function DeviceRow({
  device,
  allFields,
}: {
  device: Device;
  allFields: string[];
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
    </tr>
  );
}

export default function DeviceTable({ devices }: Props) {
  const allFields = getAllFields(devices);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {allFields.map((key) => (
            <th key={`th-${key}`}>{formatKey(key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <DeviceRow device={device} allFields={allFields} />
        ))}
      </tbody>
    </table>
  );
}
