// import { ReactNativeJoystick } from "@korsolutions/react-native-joystick";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { Text, View } from "react-native";
import Mqtt5 from "../components/MQTT";
import useMQTT from "../components/MQTT";

const Control = () => {
  const mqtt = useMQTT();
  return (
    <SafeAreaView className="flex-1 items-center bg-[#191C4A]">
      <View className="h-[230px] bg-gray-200 m-6 rounded-lg w-[90%]"></View>
      <View className="flex-1 w-full px-6">
        <Mqtt5 />
        <CustomButton
          title="LASER ON"
          isLoading={false}
          containerStyles={"w-full bg-terciary h-12"}
          handlePress={mqtt.PublishMessage(
            commandTopic.laserOnOff,
            "switch laser"
          )}
        />
        <View className="flex-row justify-between mt-3">
          <CustomButton
            title="PLAY SOUND"
            isLoading={false}
            containerStyles={"w-[30%] bg-terciary h-12"}
            textStyles={"text-[12px]"}
            handlePress={mqtt.PublishMessage(commandTopic.soundPlay, "someId")}
          />
          <CustomButton
            title="THROW BALL"
            isLoading={false}
            containerStyles={"w-[30%] bg-terciary h-12"}
            textStyles={"text-[12px]"}
            handlePress={mqtt.PublishMessage(
              commandTopic.ballLaunch,
              "request a ball"
            )}
          />
          <CustomButton
            title="SERVE SNACK"
            isLoading={false}
            containerStyles={"w-[30%] bg-terciary h-12"}
            textStyles={"text-[12px]"}
            handlePress={mqtt.PublishMessage(
              commandTopic.dropSnacks,
              "request to drop some snacks"
            )}
          />
        </View>
      </View>
      <View className="p-5">
        <ReactNativeJoystick
          color="#09C3B8"
          radius={75}
          onMove={(data) =>
            mqtt.PublishMessage(
              commandTopic.laserPosition,
              JSON.stringify(data)
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};
export default Control;
