import { useEffect, useState } from "react";
import mqtt from "mqtt";

type MqttValue = boolean | number | string;
export type Device = [key: string, fields: Record<string, MqttValue>];

export default (brokerUrl: string, topics: Set<string>): Device[] => {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      topics.forEach((topic) =>
        client.subscribe(topic, (err) => {
          if (err) console.error(`Subscription error: ${err}`);
        }),
      );
    });

    client.on("message", (topic, message) => {
      const parsedMessage = JSON.parse(message.toString());
      setMessages((prev) => ({ ...prev, [topic]: parsedMessage }));
    });

    return () => {
      client.end();
    };
  }, [brokerUrl, topics]);

  return Object.entries(messages).filter(([key]) =>
    topics.has(key),
  ) as Device[];
};
