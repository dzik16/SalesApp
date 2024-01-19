import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IconMinus, IconPlush } from '../assets/icon'
import { addDataItemLits } from '../redux/actions/addItemList';
import { getDataItemLits } from '../redux/actions/getItemLits';
import { updateDataItemList } from '../redux/actions/updateItemList';

const ModalScreen = ({ closeModal, values = {} }) => {
  const dispatch = useDispatch()
  const dataListItem = useSelector((state) => state.litsItem.listItemReducer)
  const [quantity, setQuantity] = useState(values.Quantity ? values.Quantity : 0)
  const [itemName, setItemName] = useState(values.ItemName ? values.ItemName : "")
  const [price, setPrice] = useState(values.Price ? values.Price : 0)

  const isButtonDisabled = quantity === 0 || itemName.trim() === '' || price === 0;

  const handleQuantity = (key) => {
    if (key === "+") {
      setQuantity(quantity + 1)
    } else if (key === "-" && quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setQuantity(0)
    }
  }

  const formatToRupiah = (number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };

  const handleAddItem = async () => {
    if (itemName !== "", quantity !== 0 && price !== 0) {
      const valueDelete = {
        ItemId: dataListItem.length !== 0 ? dataListItem.length + 1 : 1,
        OrderId: dataListItem.length !== 0 ? dataListItem.length + 1 : 1,
        ItemName: itemName,
        Quantity: quantity,
        Price: price
      }

      const valueUpdate = {
        ItemId: values.ItemId,
        OrderId: values.OrderId,
        ItemName: itemName,
        Quantity: quantity,
        Price: price
      }

      if (values.ItemId != null) {
        await dispatch(updateDataItemList(valueUpdate));
      } else {
        await dispatch(addDataItemLits(valueDelete));
      }

      dispatch(getDataItemLits());
      clearData()
      closeModal();
    }
  }

  const clearData = () => {
    setItemName("")
    setPrice(0)
    setQuantity(0)
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
          <Text style={{ color: "black", textAlign: 'center', marginBottom: 40, fontSize: 16 }}>{values.ItemId != null ? "Update Item" : "New Item"}</Text>

          <View>
            <Text style={{ color: "black", fontSize: 16 }}>Item Name</Text>
            <TextInput
              placeholder='Barang 1'
              name="search"
              style={styles.inputSearch}
              value={itemName.toString()}
              onChangeText={(e) => setItemName(e)}
              keyboardType='default'
              placeholderTextColor='gray'
            />
          </View>

          <View>
            <Text style={{ color: "black", marginTop: 15, fontSize: 14 }}>Price</Text>
            <TextInput
              placeholder='1000000'
              name="search"
              value={price !== 0 ? price.toString() : ""}
              onChangeText={(e) => setPrice(e)}
              style={styles.inputSearch}
              keyboardType='numeric'
              placeholderTextColor='gray'
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text style={{ color: "black", marginRight: 60, fontSize: 14 }}>QTY</Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', borderRadius: 25, backgroundColor: '#D9D9D9', height: 30, width: 'auto', padding: 5 }}>
              <TouchableOpacity onPress={() => handleQuantity("-")}>
                <Image source={IconMinus} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              
              <View>
                <Text style={{ color: "black", marginHorizontal: 15 }}>{quantity}</Text>
              </View>

              <TouchableOpacity onPress={() => handleQuantity("+")}>
                <Image source={IconPlush} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
            <Text style={{ color: "black", fontSize: 20 }}>Total :</Text>
            <Text style={{ color: "black", fontSize: 20 }}>{formatToRupiah(price * quantity)}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
            <TouchableOpacity disabled={isButtonDisabled} onPress={() => handleAddItem()} style={{ width: 100, height: 25, backgroundColor: `${isButtonDisabled ? "gray" : "#EC6E51"}`, alignItems: 'center', marginRight: 15, justifyContent: 'center', borderRadius: 10 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>{values.ItemId != null ? "Update" : "Svae"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeModal(), clearData() }} style={{ width: 100, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: "#EC6E51" }}>
              <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View >
      </Modal >
    </View >
  )
}

export default ModalScreen

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