import { Button, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterStatus from "../components/WaterStatus";
import StatusCard from "../components/StatusCard";
import ActivityCard from "../components/ActivityCard";

import { icons } from "../../constants";
import { useEffect, useState } from "react";
import ActivityRepository from "../database/ActivityRepository";
import useMQTT from "../components/MQTT";
import { commandTopic } from "../components/MQTT/commands";
import { useAlertStore } from "../components/MQTT/store";
import CustomButton from "../components/CustomButton";

const repository = new ActivityRepository();

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [time, setTime] = useState(1);
  const mqtt = useMQTT();
  const alertStore = useAlertStore();  
  

  const all = async () => {
    const activities = await repository.all();
    alertStore.setActivities(activities);
  };

  const clearTable = async () => {
    await repository.clear();
    all();
  }

  useEffect(() => {
    all();
  }, []);

  // useEffect(() => {
  //   // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
  //   const timeoutId = setTimeout(() => {
  //     create(`Activity ${time}`, String(Date.now()));
  //     setTime(time + 1);
  //   }, 2000);

  //   // Cleanup function to clear the timeout if the component unmounts
  //   return () => clearTimeout(timeoutId);
  // }, []); // Empty dependency array ensures the effect runs only once

  return (
    <SafeAreaView className="flex-1 justify-start bg-[#191C4A]">
      <Header />
      <WaterStatus level={alertStore?.alertStatus?.waterLevelAlert} temperature={(alertStore?.alertStatus?.waterTemperature + "ºC")} />
      <View className="flex-row w-full justify-between pr-2">
        <StatusCard title={"Ball Launcher"} ammount={0} />
        <StatusCard title={"Snack Dispenser"} ammount={0} />
      </View>
      <View className="flex flex-row justify-between mr-8">
        <Text className="p-3 pl-5 mt-0 text-2xl font-semibold text-white">
          Recent Activities
        </Text>
        <CustomButton title="Clear" handlePress={clearTable}/>
      </View>
      <ScrollView className="flex-1 w-full">
        {alertStore.activities.reverse().filter((item) => item.title).map((activity) => (
          <View key={activity.id}>
            <ActivityCard
              title={activity.title}
              date={String(new Date(Number(activity.timeStamp)))}
              type={activity.type}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
