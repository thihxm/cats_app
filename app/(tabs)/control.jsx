import { ReactNativeJoystick } from "@korsolutions/react-native-joystick";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { Text, View } from "react-native";

const Control = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-[#191C4A]">
      <View className="h-[350px] bg-gray-200 m-6 rounded-lg w-[90%]"></View>
      <View className="flex-1 w-full px-6">
        <CustomButton
          title="LASER ON"
          isLoading={false}
          containerStyles={"w-full bg-terciary h-12"}
        />
        <View className="flex-row justify-between mt-3">
          <CustomButton
            title="PLAY SOUND"
            isLoading={false}
            containerStyles={"w-[30%] bg-terciary h-12"}
            textStyles={"text-[12px]"}
          />
          <CustomButton
            title="THROW BALL"
            isLoading={false}
            containerStyles={"w-[30%] bg-terciary h-12"}
            textStyles={"text-[12px]"}
          />
          <CustomButton
            title="SERVE SNACK"
            isLoading={false}
            containerStyles={"w-[30%] bg-terciary h-12"}
            textStyles={"text-[12px]"}
          />
        </View>
      </View>
      <View className="p-5">
        <ReactNativeJoystick color="#09C3B8" radius={75} />
      </View>
    </SafeAreaView>
  );
};
export default Control;
