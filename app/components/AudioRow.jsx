import { Image, Text, View } from "react-native";
import { icons } from "../../constants";

const SoundIcon = () => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icons.play}
        resizeMode="contain"
        tintColor={"#fff"}
        className="w-6 h-6"
      />
    </View>
  );
};

const DeleteIcon = () => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icons.DeleteIcon}
        resizeMode="contain"
        tintColor={"#fff"}
        className="w-6 h-6"
      />
    </View>
  );
};

const AudioRow = ({ title, excludable }) => {
  return (
    <View className="flex-row justify-center">
      <View
        className={`flex-row items-center pt-0 ${
          excludable ? "w-[54%]" : "w-[70%]"
        } justify-start bg-terciary rounded-xl px-5 my-1 py-3 mr-3`}
      >
        <SoundIcon />
        <Text className="font-bold text-white ml-3">{title}</Text>
      </View>
      {excludable && (
        <View className="justify-center my-1 bg-secondary mr-1 rounded-xl items-center w-[15%]">
          <DeleteIcon />
        </View>
      )}
      <View className="justify-center my-1 bg-secondary rounded-xl items-center w-[15%]">
        <SoundIcon />
      </View>
    </View>
  );
};
export default AudioRow;
