import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  INFO_ICON_COLOR,
  INPUT_TEXT_COLOR,
  LABEL_COLOR,
  PRIMARY_BLUE,
} from "../constants";

const BDayPicker = ({ month, setMonth, day, setDay, year, setYear }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from(Array(31), (_, i) => i + 1); // Create an array with values from 1 to 31
  const years = Array.from(Array(122), (_, i) => i + 1900); // Create an array with values from 1900 to 2022
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.pickerViews}>
              <View style={{ flexDirection: "row", flex: 1.2 }}>
                <Picker
                  style={styles.picker}
                  selectedValue={month}
                  onValueChange={(itemValue) => setMonth(itemValue)}
                >
                  {months.map((month, index) => (
                    <Picker.Item key={index} label={month} value={month} />
                  ))}
                </Picker>
              </View>
              <View style={{ flexDirection: "row", flex: 0.65 }}>
                <Picker
                  style={styles.picker}
                  selectedValue={day}
                  onValueChange={(itemValue) => setDay(itemValue)}
                >
                  {days.map((day, index) => (
                    <Picker.Item key={index} label={`${day}`} value={day} />
                  ))}
                </Picker>
              </View>
              <View style={{ flexDirection: "row", flex: 0.85 }}>
                <Picker
                  style={styles.picker}
                  selectedValue={year}
                  onValueChange={(itemValue) => setYear(itemValue)}
                >
                  {years.map((year, index) => (
                    <Picker.Item key={index} label={`${year}`} value={year} />
                  ))}
                </Picker>
              </View>
            </View>

            <Button
              onPress={() => setModalVisible(!modalVisible)}
              title="Done"
            ></Button>
          </View>
        </View>
      </Modal>

      <View style={styles.formContainer}>
        <Text style={styles.labelStyle}>Date of Birth</Text>
        <View style={styles.dateContainer}>
          <MaterialIcons name="date-range" size={24} style={styles.iconStyle} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.dateTextStyle}>
              {month} {day} {year}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalView: {
    marginHorizontal: 20,
    marginVertical: 80,
    backgroundColor: "#d1d1d1",
    borderRadius: 20,
    height: "31%",
  },

  pickerViews: {
    flexDirection: "row",
  },

  picker: {
    flex: 1,
  },

  formContainer: {
    borderBottomWidth: 1,
    borderColor: "#8e9aa4",
  },

  dateContainer: {
    flexDirection: "row",
  },

  iconStyle: {
    marginBottom: 10,
    marginRight: 10,
    color: INFO_ICON_COLOR,
  },

  dateTextStyle: {
    fontSize: 17,
    color: INPUT_TEXT_COLOR,
  },

  labelStyle: {
    color: LABEL_COLOR,
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 13,
  },
});
export default BDayPicker;
