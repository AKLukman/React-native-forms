import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresing, setRefreshing] = useState(true);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isPosting, setIspostig] = useState(false);
  const [error, setError] = useState("");
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

  const addPost = async () => {
    setIspostig(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
          userId: 1,
        }),
      });
      const newPost = await res.json();

      setPostList([newPost, ...postList]);

      setPostTitle("");
      setPostBody("");
      setIspostig(false);
      setError("");
    } catch (error) {
      console.error("Error adding new post: ", error);
      setError("Faild to add psot!");
    }
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
      <>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          ""
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="post title"
            value={postTitle}
            onChangeText={setPostTitle}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="post body"
            value={postBody}
            onChangeText={setPostBody}
          ></TextInput>
          <Button
            title={isPosting ? "Adding..." : "Add Post"}
            onPress={addPost}
            disabled={isPosting}
          ></Button>
        </View>

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
            showsVerticalScrollIndicator={false}
          ></FlatList>
        </View>
      </>
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
  inputContainer: {
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  errorContainer: {
    backgroundColor: "#FFC0CB",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 16,
    alignItems: "center",
  },
  errorText: {
    color: "#D8000C",
    fontSize: 16,
    textAlign: "center",
  },
});
