import { useState } from "react";
import DeviceTable from "./components/device-table";
import TopicChooser from "./components/topic-chooser";
import useMqtt from "./hooks/useMqtt";

const BROKER_URL = "wss://broker.emqx.io:8084/mqtt";

const ALL_TOPICS = [
  "device/1/battery",
  "device/2/battery",
  "device/3/battery",
  "device/4/battery",
];

export default function App() {
  const [topics, setTopics] = useState(new Set(ALL_TOPICS));
  const devices = useMqtt(BROKER_URL, topics);

  /** Toggles the subscription of the selected device. */
  function onDeviceToggle(topic: string) {
    if (topics.has(topic)) {
      topics.delete(topic);
    } else {
      topics.add(topic);
    }

    setTopics(new Set(topics));
  }

  return (
    <>
      <TopicChooser
        allTopics={ALL_TOPICS}
        selectedTopics={topics}
        onChange={onDeviceToggle}
      />
      <DeviceTable devices={devices} />
    </>
  );
}
