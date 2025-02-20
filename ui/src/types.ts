export type MqttValue = boolean | number | string;

/**
 * An example device might include fields such as:
 * - capacity: 2500
 * - cycles: 181
 * - health: "good"
 * - level: 49.65
 * - low_warning: false
 * - runtime_remaining: "3h 54m"
 * - status: "discharging"
 * - temperature: 19.36
 * - voltage: 2.02
 */
export type Device = [key: string, fields: Record<string, MqttValue>];
