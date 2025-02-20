import { MqttValue } from "./types";

/** "Translates" a field key into something more human-readable. */
export function formatKey(key: string) {
  return key.split("_").join(" ");
}

/** Formats a boolean value into emojis; otherwise, shows the value. */
export function formatValue(value: MqttValue) {
  if (typeof value === "boolean") {
    return value ? "🟥" : "🟢";
  }

  return value;
}
