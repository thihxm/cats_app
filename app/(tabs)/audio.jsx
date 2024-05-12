import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AudioRow from "../components/AudioRow";

const Audio = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#191C4A]">
      <View className="flex-row justify-start p-8">
        <Text className="text-2xl text-white">Audio</Text>
      </View>
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} excludable={true} />
    </SafeAreaView>
  );
};
export default Audio;
