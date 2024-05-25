import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScheduleRow from "../components/ScheduleRow";
import { icons } from "../../constants";
import { scheduleId } from "../components/MQTT/commands";

const Schedule = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#191C4A]">
      <View className="flex-row items-start p-8 pb-2">
        <Text className="text-white text-2xl">Schedule Configuration</Text>
      </View>
      <View className="items-center">
        <ScheduleRow
          title={"Ball Launcher"}
          icon={icons.leftArrow}
          commandId={scheduleId.snackDispenser}
        />
      </View>
      <View className="items-center">
        <ScheduleRow
          title={"Snack Dispenser"}
          icon={icons.plus}
          commandId={scheduleId.snackDispenser}
        />
      </View>
      {/* <View className="items-center">
        <ScheduleRow title={"Sound Player"} icon={icons.play} />
      </View> */}
    </SafeAreaView>
  );
};
export default Schedule;
