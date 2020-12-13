import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
  Share,
} from "react-native";

async function shareArticle(article) {
  try {
    await Share.share({
      message: "Checkout this article " + article,
    });
  } catch (error) {
    console.log(error);
  }
}

const NewsItem = ({ item }) => {
  const { width, height } = Dimensions.get("window");
  return (
    <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
      <View
        style={{
          width: width - 50,
          heigth: 200,
          marginBottom: 15,
          borderRadius: 15,
        }}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.itemImage} />
        <View styles={styles.gradient}>
          <Text
            style={{
              color: "#fff",
              position: "absolute",
              bottom: 0,
              fontSize: 25,
              padding: 5,
            }}
          >
            {item.title}
          </Text>
          <Text
            onPress={() => shareArticle(item.url)}
            style={{
              fontSize: 18,
              color: "#fff",
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 5,
              marginBottom: 220,
              marginRight: 10,
              fontWeight: "bold",
            }}
          >
            Share
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
  },
  itemImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
  },
});

export default NewsItem;
