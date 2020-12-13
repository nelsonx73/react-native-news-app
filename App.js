import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  LogBox,
} from "react-native";

import axios from "axios";

import NewsItem from "./NewsItem";

LogBox.ignoreAllLogs(true);
export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    const response = await axios
      .get(
        //"https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=ed548abd82c146609e1352f8078d90b8"
        "http://newsapi.org/v2/top-headlines?country=us&apiKey=ed548abd82c146609e1352f8078d90b8"
      )
      .then((res) => res.data);

    setNews(response.articles);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function renderItem({ item }) {
    return <NewsItem item={item} />;
  }

  function fetchItems() {
    setLoading(true);
    getData();
    setLoading(false);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Top</Text>
          <Text style={styles.headerText}>Headlines</Text>
        </View>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          // <View style={styles.news}>
          <FlatList
            style={styles.news}
            data={news}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            onRefresh={fetchItems}
            refreshing={loading}
          />
          // </View>
        )}
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  header: {
    paddingTop: 50,
    paddingLeft: 50,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 35,
    color: "#fff",
  },
  news: {
    alignSelf: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
