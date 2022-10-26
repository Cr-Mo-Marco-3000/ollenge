import { Text } from "react-native-paper";
import { StyleSheet, Button, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function StartScreen({ startScreenChange }) {
  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={["#EDF8FF", "#FCBE32"]}
      end={{ x: 0.5, y: 1 }}
    >
      <Button title="전환" onPress={startScreenChange} />
    </LinearGradient>
  );
}
export default StartScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: "center",
  },
});
