import { Text, TouchableOpacity, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import Mqtt from "./integration";

export default function Welcome() {
  return (
    <View className="flex-1 items-center justify-center bg-[#191C4A]">
      <Mqtt />
      {/* <Redirect href="/home" /> */}
    </View>
  );
}
