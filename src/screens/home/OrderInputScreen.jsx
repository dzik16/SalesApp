import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconMenu, IconAvatar, IconMinus, IconPlush, IconPencil, IconTrash } from '../../assets/icon';
import ModalScreen from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import { useDispatch, useSelector } from 'react-redux';
import { getDataItemLits } from '../../redux/actions/getItemLits';
import { updateDataItemList } from '../../redux/actions/updateItemList';
import ModalProcess from '../../components/ModalProcess';
import LottieView from "lottie-react-native";

const OrderInputScreen = ({ navigation }) => {
  const [addItem, setAddItem] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false)
  const [processItem, setProcessItem] = useState(false)
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.isLoading.isLoading)
  const dataListItem = useSelector((state) => state.litsItem.listItemReducer)
  const stateGeneral = useSelector((state) => state.generateState.generateState)
  const [dataTempListItem, setDataTempListItem] = useState({})

  useEffect(() => {
    dispatch(getDataItemLits())
  }, [dispatch])

  const formatToRupiah = (number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };

  useEffect(() => {
    if (deleteItem === false && addItem === false) {
      setDataTempListItem({})
    }
  }, [addItem, deleteItem])

  const calculateSubtotal = () => {
    const subtotal = dataListItem.reduce((acc, item) => acc + (item.Price || 0) * (item.Quantity || 0), 0);
    return formatToRupiah(subtotal.toFixed(0));
  };

  const calculateTotalProducts = () => {
    const totalProducts = dataListItem.reduce((acc, item) => acc + item.Quantity, 0);
    return totalProducts;
  };

  const handleUpdateQuantity = async (value, quantity) => {
    const valueUpdate = {
      ItemId: value.ItemId,
      OrderId: value.OrderId,
      ItemName: value.ItemName,
      Quantity: quantity,
      Price: value.Price
    }

    await dispatch(updateDataItemList(valueUpdate));
    dispatch(getDataItemLits());

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.header}>
          <Image source={IconAvatar} style={styles.avatar} />
          <TouchableOpacity>
            <Image source={IconMenu} style={styles.logo} />
          </TouchableOpacity>
        </View>
        {
          addItem ?
            <ModalScreen closeModal={() => setAddItem(false)} values={dataTempListItem} />
            : null
        }
        {
          deleteItem ?
            <ModalDelete closeModal={() => setDeleteItem(false)} value={dataTempListItem} />
            : null
        }
        {
          processItem ?
            <ModalProcess closeModal={() => setProcessItem(false)} value={dataTempListItem} navigation={navigation} />
            : null
        }
        <View style={styles.containerTitle}>
          <Text style={styles.titleHeader}>Sales Order Input</Text>
        </View>
      </View>

      {
        isLoading ?
          <View>
            <LottieView
              source={require("../../assets/animasi/loading.json")}
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          </View>
          :
          <>

            <ScrollView style={styles.containerContent}>
              <View style={styles.containerSearch}>
                <Text style={styles.titleSearch}>Sales Information</Text>
                <TextInput
                  placeholder='Sales Order Number'
                  name="search"
                  style={styles.inputSearch}
                  keyboardType='default'
                  placeholderTextColor='gray'
                />
                <TextInput
                  placeholder='Sales Order Date'
                  name="search"
                  style={styles.inputSearch}
                  keyboardType='default'
                  placeholderTextColor='gray'
                />
                <TextInput
                  placeholder='Customer'
                  name="search"
                  style={styles.inputSearch}
                  keyboardType='default'
                  placeholderTextColor='gray'
                />
                <TextInput
                  placeholder='Address'
                  name="search"
                  style={styles.textArea}
                  keyboardType='default'
                  placeholderTextColor='gray'
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View style={{ marginLeft: 15, marginRight: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                  <Text style={styles.titleSearch}>Detail Sales</Text>
                  <TouchableOpacity onPress={() => setAddItem(true)} style={{ width: 85, height: 25, backgroundColor: "#EC6E51", alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <Text style={{ color: "white", fontSize: 12 }}>Add Item</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ paddingBottom: 50, marginLeft: 15, marginRight: 15 }}>

                {Array.isArray(dataListItem) &&
                  dataListItem.map((e, i) => (
                    <View key={i} style={styles.cardContainer}>

                      <View>
                        <Text style={styles.textList}>
                          {e.ItemName}
                        </Text>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={styles.textList}>
                            {formatToRupiah(e.Price).length > 11
                              ? `${formatToRupiah(e.Price).substring(0, 11)}...`
                              : formatToRupiah(e.Price)}
                          </Text>
                        </View>

                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textList}>
                          QTY
                        </Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', borderRadius: 25, backgroundColor: '#D9D9D9', height: 30, width: "auto", padding: 5 }}>
                            <TouchableOpacity onPress={() => {
                              handleUpdateQuantity(dataListItem[i], dataListItem[i].Quantity - 1)
                            }}>
                              <Image source={IconMinus} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                            <View>
                              <Text style={{ color: "black", marginHorizontal: 10 }}>{e.Quantity}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                              handleUpdateQuantity(dataListItem[i], dataListItem[i].Quantity + 1)
                            }}>
                              <Image source={IconPlush} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textList}>
                          Total
                        </Text>
                        <Text style={styles.textList}>
                          {formatToRupiah(e.Price * e.Quantity).length > 12
                            ? `${formatToRupiah(e.Price * e.Quantity).substring(0, 12)}...`
                            : formatToRupiah(e.Price * e.Quantity)}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                          setDataTempListItem(dataListItem[i])
                          setAddItem(true)
                        }}>
                          <Image source={IconPencil} style={{ width: 20, height: 20, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setDataTempListItem(dataListItem[i])
                          setDeleteItem(true)
                        }}>
                          <Image source={IconTrash} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View >
            </ScrollView >

            <View style={{ width: '100%', backgroundColor: 'white' }}>
              <View style={styles.footerContainer}>
                <View>
                  <Text style={{ color: 'black' }}>Order Summary</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12 }}>
                  <View>
                    <Text style={{ color: 'black' }}>Sub total :</Text>
                    <Text style={{ color: 'black' }}>Total Product :</Text>
                  </View>
                  <View>
                    <Text style={{ color: 'black' }}>{calculateSubtotal()}</Text>
                    <Text style={{ color: 'black' }}>{calculateTotalProducts()} Product</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 12 }}>
                  <TouchableOpacity onPress={() => setProcessItem(true)} style={{ width: 100, height: 25, backgroundColor: "#EC6E51", alignItems: 'center', marginRight: 15, justifyContent: 'center', borderRadius: 10 }}>
                    <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>Process order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: 100, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: "#EC6E51" }}>
                    <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
      }

    </View >
  );
};

export default OrderInputScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    backgroundColor: "#fff",
    width: 300,
    height: 300,
    justifyContent: "center",
    padding: 30,
    borderRadius: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#EC6E51',
  },
  containerHeader: {
    padding: 15,
  },
  containerTitle: {
    paddingTop: 30,
  },
  titleHeader: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logo: {
    width: 25,
    height: 25,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    position: 'absolute',
    bottom: 25,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerContent: {
    backgroundColor: 'white',
    height: "100%",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#B9B9B9",
    borderRadius: 10,
    height: 70,
    marginTop: 15,
    padding: 10,
    color: 'black',
  },
  containerSearch: {
    borderWidth: 1,
    borderColor: "#B9B9B9",
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 10
  },
  titleSearch: {
    color: "black",
    fontWeight: 'bold',
  },
  inputSearch: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#B9B9B9",
    marginTop: 15,
    padding: 5,
    color: 'black',
    paddingLeft: 10
  },
  cardContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
      },
    }),
  },

  footerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  textList: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  }
});
