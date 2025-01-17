import { Text, View } from "react-native";

const Header = () => {
  return (
    <View className="flex-row justify-start items-center p-6 w-full gap-3">
      <Text className="font-bold text-white text-3xl">C.A.T.S.</Text>
      <View className="w-12 h-6 items-center justify-center rounded-full bg-secondary">
        <Text className="font-bold text-primary">ON</Text>
      </View>
    </View>
  );
};
export default Header;
