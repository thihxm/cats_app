import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";

// import mqtt from "precompiled-mqtt";
// import AWSIoT from "aws-iot-device-sdk-v2";
// import FileSystem from "expo-file-system";

export default function RootLayout() {
  // const [connectionStatus, setConnectionStatus] = useState(false);
  // const [messages, setMessages] = useState("?");
  // const clientId = "iotconsole-a4c4c261-e46e-4a5a-977d-d46d9f935014";
  // const host = "mqtts://aisuwtehmlkdh-ats.iot.sa-east-1.amazonaws.com:8883";
  // const options = {
  //   protocolId: "MQTT",
  //   protocolVersion: 5,
  // };

  // const client = mqtt.connect(host, options);
  // client.on("connect", function () {
  //   console.log("Conectado ao Broker MQTT");
  //   // Inscreva-se em tópicos, publique mensagens, etc.
  // });

  // function generateMessage(topicAlias) {
  //   return JSON.stringify({
  //     mqttv5: "has arrived",
  //     date_time: new Date().toISOString(),
  //     topic_alias: topicAlias,
  //   });
  // }

  return (
    <View className="flex-1 items-center justify-center bg-[#191C4A]">
      <Text className="text-white font-bold text-6xl">C.A.T.S.</Text>
      <Link
        href={"/home"}
        className="mt-2 font-bold text-1xl bg-secondary p-2 rounded-full px-5 text-white"
      >
        ENTER
      </Link>
    </View>
  );
}
