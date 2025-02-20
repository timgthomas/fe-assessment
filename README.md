# MQTT Client Management and Real-Time Data Task

## Overview

This task will test your ability to manage MQTT clients, handle real-time data, and publish data to a broker via an API. You will be working with the EMQX broker and subscribing to specific topics to display and manage device data.

## Requirements

### MQTT Topics

You need to subscribe to the following topics on the EMQX broker (`wss://broker.emqx.io:8084/mqtt`):

- `device/1/battery`
- `device/2/battery`
- `device/3/battery`
- `device/4/battery`

### Data Display

Display the data for these devices in a table or DataGrid with the following columns:

- **ID**: Device ID
- **Name**: Device Name
- **Value Properties**: Columns based on the value properties of the data

Each device should be represented as a row with its corresponding data in the columns. The first two columns should be the device name and ID. You can create the device name and use the number ID from the topic path as you see fit.

#### Example

For a JSON value like `{time: 31654651, temp: 85, hum: 45}`, the columns would be:

- ID
- Name
- Time
- Temperature
- Humidity

### Data Handling

The data should:

- Update in real-time
- Allow users to unsubscribe from topics
- Avoid overloading the browser
- Be styled for easy readability
- Retain previous values on update (do not reset data)

### Data Publishing

Add a column for each device to publish a value to the topic based on user input. When the icon in this column is clicked, it should open a dialog for the user to enter values. This should connect to an endpoint in the API you'll create to handle the publishing.

### Customization

You can overwrite any DOM or CSS in the package. There is an existing function in the API to generate random values for these devices.

## Setup

To run this project, you need to install the required packages in both the UI and API directories.

### Recommended Libraries

- MUI (Material-UI)
- MUI DataGrid

## Bonus Points

- Implement unit tests
- Add comments to your code

---

Good luck!
