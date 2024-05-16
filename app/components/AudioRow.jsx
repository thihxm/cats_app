import { Image, Text, TouchableHighlight, View } from "react-native";
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
    <View className="flex-row justify-center items-center">
      <View
        className={`flex-row items-center pt-0 ${
          excludable ? "w-[69%]" : "w-[75%]"
        } justify-start bg-terciary rounded-xl px-5 my-1 py-3 mr-3`}
      >
        <SoundIcon />
        <Text className="font-bold text-white ml-3">{title}</Text>
      </View>
      {excludable && (
        <TouchableHighlight>
          <DeleteIcon />
        </TouchableHighlight>
      )}
      <TouchableHighlight>
        <SoundIcon />
      </TouchableHighlight>
    </View>
  );
};
export default AudioRow;
