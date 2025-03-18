import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [isDark, setIsDark] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        // secureTextEntry
        // keyboardType="numeric"
        autoCorrect={false}
        autoCapitalize="none"
      ></TextInput>
      <Text style={styles.text}>Name is {name}</Text>
      {/* multu line text input */}
      <TextInput
        style={[styles.input, styles.multilineText]}
        placeholder="message"
        multiline
      ></TextInput>
      {/* switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Dark mode</Text>
        <Switch
          value={isDark}
          onValueChange={() => setIsDark(!isDark)}
          trackColor={{ false: "#767577", true: "lightblue" }}
          thumbColor="#f4f3f4"
        ></Switch>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  multilineText: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
