import React, { useState } from "react";
import useMqtt, { Device } from "./hooks/useMqtt";

const BROKER_URL = "wss://broker.emqx.io:8084/mqtt";

const ALL_TOPICS = [
  "device/1/battery",
  "device/2/battery",
  "device/3/battery",
  "device/4/battery",
];

/*
Example device response
  capacity: 2500
  cycles: 181
  health: "good"
  level: 49.65
  low_warning: false
  runtime_remaining: "3h 54m"
  status: "discharging"
  temperature: 19.36
  voltage: 2.02
*/

interface TableProps {
  devices: Device[];
}

function DeviceTable({ devices }: TableProps) {
  const byName = (lhs: string, rhs: string) => lhs.localeCompare(rhs);

  // A `Set` ensures unique values, at the cost of some readability
  const allFields = [
    ...new Set(devices.flatMap(([, fields]) => Object.keys(fields))),
  ].sort(byName);

  function DeviceRow([key, fields]: Device) {
    const [, id, name] = key.match(/^device\/(\d+)\/(.+)/i) ?? [];

    return (
      <tr key={key}>
        <td>{id}</td>
        <td>{name}</td>
        {allFields.map((key) => (
          <th>{fields[key] || "—"}</th>
        ))}
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {allFields.map((key) => (
            <th>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>{devices.map(DeviceRow)}</tbody>
    </table>
  );
}

const App: React.FC = () => {
  const [topics, setTopics] = useState(new Set(ALL_TOPICS));
  const devices = useMqtt(BROKER_URL, topics);

  /** Toggles the subscription of the selected topic. */
  function onTopicToggle(topic: string) {
    if (topics.has(topic)) {
      topics.delete(topic);
    } else {
      topics.add(topic);
    }

    setTopics(new Set(topics));
  }

  return (
    <div>
      <h1>MQTT Messages</h1>
      <div>
        {ALL_TOPICS.map((topic) => (
          <label key={topic}>
            <input
              type="checkbox"
              checked={topics.has(topic)}
              onChange={() => onTopicToggle(topic)}
            />
            {topic}
          </label>
        ))}
      </div>
      <DeviceTable devices={devices} />
    </div>
  );
};

export default App;
