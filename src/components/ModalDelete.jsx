import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDataItemLits } from '../redux/actions/deleteItemList';
import { getDataItemLits } from '../redux/actions/getItemLits';

const ModalDelete = ({ closeModal, value = {} }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    console.log(value);
    await dispatch(deleteDataItemLits(value));
    dispatch(getDataItemLits());
    closeModal();
  };

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
            <View style={{ borderWidth: 10, borderColor: "red", borderRadius: 75, width: 150, height: 150 }}>
              <Text style={{ color: "red", fontSize: 120, textAlign: 'center', marginTop: -20 }}>?</Text>
            </View>

            <Text style={{ color: "black", marginVertical: 40, fontWeight: 'bold', fontSize: 15 }}>Are you sure wants to delete this item ?</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => handleDelete()} style={{ width: 100, height: 25, backgroundColor: "#EC6E51", alignItems: 'center', marginRight: 15, justifyContent: 'center', borderRadius: 10 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeModal()} style={{ width: 100, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: "#EC6E51" }}>
              <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>No</Text>
            </TouchableOpacity>
          </View>
        </View >
      </Modal >
    </View >
  )
}

export default ModalDelete

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