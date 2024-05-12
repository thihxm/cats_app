import { Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import CustomButton from "./components/CustomButton";

export default function RootLayout() {
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
