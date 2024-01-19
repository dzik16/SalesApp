import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import { IconTick } from '../assets'

const ModalSuccess = ({ closeModal }) => {
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
            <View style={{ borderWidth: 10, borderColor: "#08E138", justifyContent: 'center', borderRadius: 75, width: 150, height: 150 }}>
              <Image source={IconTick} style={{ height: 90, width: 90, alignSelf: 'center' }} />
            </View>
            <Text style={{ color: "black", marginVertical: 40, fontWeight: 'bold', fontSize: 15 }}>Your item has been successfully processed</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => closeModal()} style={{ width: 100, height: 25, backgroundColor: "#08E138", alignItems: 'center', marginRight: 15, justifyContent: 'center', borderRadius: 10 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View >
      </Modal >
    </View >
  )
}

export default ModalSuccess

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