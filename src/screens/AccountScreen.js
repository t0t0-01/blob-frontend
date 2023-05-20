import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LIGHT_TEXT, PRIMARY_BLUE } from "../constants";
import AuthContext from "../context/AuthContext";
import server from "../api/server";
import { useFocusEffect } from "@react-navigation/native";

const AccountScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { userToken } = useContext(AuthContext);

  const [ACCOUNT, setACCOUNT] = useState(null);

  useFocusEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await server.get("/user/get_by_id", {
          params: { id: "Antonio" },
        });
        setACCOUNT(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccount();
  });

  if (!ACCOUNT) return null;

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
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: "data:image/png;base64," + ACCOUNT.picture }}
        />
        <Text style={styles.name}>
          {ACCOUNT.first_name} {ACCOUNT.last_name}
        </Text>
      </View>

      <View style={styles.bodyContent}>
        <Input
          inputContainerStyle={styles.info}
          label="Email"
          value={ACCOUNT.email}
          disabled
          disabledInputStyle={{ color: "black" }}
        />
        <Input
          inputContainerStyle={styles.info}
          label="Phone Number"
          value={ACCOUNT.phone_nb}
          disabled
          disabledInputStyle={{ color: "black" }}
        />
        <Input
          inputContainerStyle={styles.info}
          label="Date of Birth"
          value={ACCOUNT.date_of_birth}
          disabled
          disabledInputStyle={{ color: "black" }}
        />

        <Button
          buttonStyle={styles.button}
          title="View Personality Dashboard"
          onPress={() => navigation.navigate("Dashboard")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: "white" },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: PRIMARY_BLUE,
    marginTop: 30,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    color: PRIMARY_BLUE,
    fontWeight: "600",
  },

  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  info: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderColor: LIGHT_TEXT,
    borderRadius: 10,
  },

  button: {
    borderRadius: 10,
    backgroundColor: PRIMARY_BLUE,
    alignSelf: "center",
    width: "100%",
    height: 50,
  },
});

export default AccountScreen;
