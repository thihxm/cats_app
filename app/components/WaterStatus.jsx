import { Image, ImageBackground, Text, View } from "react-native";
import { images } from "../../constants";

const WaterStatus = () => {
  return (
    <View className="bg-emerald-300 mb-4">
      <ImageBackground
        source={images.waterbg}
        resizeMode="cover"
        className="w-full h-[200px]"
      >
        <View className="flex-1 justify-center items-center gap-2">
          <Text className="font-bold text-white text-3xl">25ºC</Text>
          <Text className="font-bold text-white">Water is</Text>
          <Text className="font-bold text-white text-4xl">GOOD</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default WaterStatus;
