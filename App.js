import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresing, setRefreshing] = useState(true);
  const fetchData = async (limit = 10) => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    const response = await data.json();
    setPostList(response);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(20);
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            return (
              <View style={styles.post}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody}>{item.body}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListEmptyComponent={<Text>No post found!</Text>}
          ListHeaderComponent={
            <Text style={styles.headerText}>Post List {postList.length}</Text>
          }
          ListFooterComponent={
            <Text style={styles.footerText}>End of post</Text>
          }
          refreshing={refresing}
          onRefresh={handleRefresh}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  post: {
    borderWidth: 1,
    padding: 10,
    // marginVertical: 10,
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "blod",
    marginVertical: 10,
  },
  footerText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
