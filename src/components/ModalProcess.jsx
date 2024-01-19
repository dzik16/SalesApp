import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clearItemList, getDataItemLits } from '../redux/actions/getItemLits';
import { getGenerateState, getToken } from '../redux/actions/getToken';
import { generateRandomNumber } from '../config';
import config from '../config';

const ModalProcess = ({ navigation, closeModal }) => {
  const dispatch = useDispatch()

  const handleProcessItem = () => {
    dispatch(getGenerateState(generateRandomNumber()))
    dispatch(getToken(config.bodyGetToken))
    dispatch(clearItemList());
    navigation.navigate("Home", { timestamp: new Date().getTime() })
    closeModal();
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={true} onBackdropPress={closeModal}>
        <View style={{
          backgroundColor: "#FFFFFF",
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 6
        }}>

          <View style={{ alignItems: "center" }}>
            <View style={{ borderWidth: 10, borderColor: "green", borderRadius: 75, width: 150, height: 150 }}>
              <Text style={{ color: "green", fontSize: 120, textAlign: 'center', marginTop: -20 }}>?</Text>
            </View>
            <Text style={{ color: "black", marginVertical: 40, fontWeight: 'bold', fontSize: 15 }}>Are you sure wants to process this item ?</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => handleProcessItem()} style={{ width: 100, height: 25, backgroundColor: "green", alignItems: 'center', marginRight: 15, justifyContent: 'center', borderRadius: 10 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeModal()} style={{ width: 100, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: "red" }}>
              <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>No</Text>
            </TouchableOpacity>
          </View>
        </View >
      </Modal >
    </View >
  )
}

export default ModalProcess

const styles = StyleSheet.create({
  inputSearch: {
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#B9B9B9",
    marginTop: 5,
    padding: 5,
    color: 'black',
    paddingLeft: 10
  }
})