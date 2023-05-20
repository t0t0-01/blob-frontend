import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthContext from "../context/AuthContext";
import server from "../api/server";
import { TouchableOpacity } from "react-native";

const FriendsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { userToken } = useContext(AuthContext);

  const [friends, setFriends] = useState(null);
  const blobAvatar = require("../../assets/blob.png");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await server.get("/user/get_friends", {
          params: { id: userToken.id },
        });
        setFriends(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriends();
  }, []);

  const fetchQuery = async (query) => {
    try {
      const response = await server.get("/user/get_friend_by_name", {
        params: { friend_name: query },
      });

      setFriends(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!friends) return null;

  return (
    <View
      style={{
        ...styles.mainView,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <SearchBar
        placeholder="Type Here..."
        value={searchText}
        onChangeText={(val) => setSearchText(val)}
        onSubmitEditing={() => fetchQuery(searchText)}
        onClear={() => {
          setSearchText("");
          fetchQuery("");
        }}
        platform="ios"
        containerStyle={styles.searchContainer}
      />

      <View style={styles.listView}>
        <FlatList
          data={friends}
          numColumns={3}
          columnWrapperStyle={styles.columnView}
          renderItem={({ item }) => {
            return (
              <View style={styles.profileView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profile", { user_id: item.user_id })
                  }
                >
                  <Image source={blobAvatar} style={styles.blobPicture} />

                  <Text>
                    {item.first_name} {item.last_name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  searchContainer: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 10,
  },

  listView: {
    flex: 1,
  },

  columnView: {
    marginVertical: 10,
    justifyContent: "space-around",
  },

  profileView: {
    justifyContent: "space-around",
  },

  blobPicture: {
    width: 95,
    height: 85,
  },
});

export default FriendsScreen;
