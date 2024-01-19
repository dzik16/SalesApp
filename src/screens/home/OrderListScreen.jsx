import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconMenu, IconAvatar } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import { getDataOrderLits } from '../../redux/actions';
import LottieView from "lottie-react-native";
import { useRoute } from '@react-navigation/native';
import { getDataItemLits } from '../../redux/actions/getItemLits';
import { setLoginLoading } from '../../redux/actions/loading';
import ModalSuccess from '../../components/ModalSuccess';

const OrderListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const route = useRoute();
  const dataListOrder = useSelector((state) => state.listOrder.listOrderReducer)
  const isLoading = useSelector((state) => state.isLoading.isLoading)
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchOrderDate, setSearchOrderDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [timestamp, setTimestamp] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDataOrderLits());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (dataListOrder) {
      setFilteredData(dataListOrder);
    }
  }, [dataListOrder]);

  useEffect(() => {
    const timestampparams = route.params?.timestamp;
    if (timestampparams) {
      setTimestamp(timestampparams)
    }
  }, [route.params])

  useEffect(() => {
    handleSearch();
  }, [searchKeyword, searchOrderDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleSearch = () => {
    const filteredResults = dataListOrder.filter((item) => {
      const matchKeyword =
        item.CustomerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.OrderNo.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchOrderDate =
        searchOrderDate === '' || item.OrderDate.includes(searchOrderDate);
      return matchKeyword && matchOrderDate;
    });

    setFilteredData(filteredResults);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={IconAvatar} style={styles.avatar} />
        <TouchableOpacity>
          <Image source={IconMenu} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {
        timestamp ?
          <ModalSuccess closeModal={() => setTimestamp(false)} />
          : null
      }
      {
        isLoading ?
          <View>
            <LottieView
              source={require("../../assets/animasi/loading.json")}
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop
            />
          </View>
          :

          <ScrollView>

            <View style={styles.containerTitle}>
              <Text style={styles.titleHeader}>Sales Order List</Text>
            </View>

            <View style={[styles.containerContent, { height: dataListOrder ? "auto" : 710, }]}>
              <View style={styles.containerSearch}>
                <Text style={styles.titleSearch}>Search</Text>
                <TextInput
                  placeholder='Keyword'
                  name="search"
                  style={styles.inputSearch}
                  onChangeText={(text) => setSearchKeyword(text)}
                  keyboardType='default'
                  placeholderTextColor='gray'
                />
                <TextInput
                  placeholder='Order Date'
                  name="search"
                  style={styles.inputSearch}
                  onChangeText={(text) => setSearchOrderDate(text)}
                  keyboardType='default'
                  placeholderTextColor='gray'
                />
              </View>

              <View style={{ marginLeft: 15, marginRight: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                  <Text style={styles.titleSearch}>Order List</Text>
                  <Text style={styles.titleSearch}>Total Items: {Array.isArray(dataListOrder) ? dataListOrder.length : 0}</Text>

                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Input')}
                  style={styles.buttonAdd}>
                  <Text style={{ color: "white", fontSize: 12 }}>Add</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.containerList}>
                {Array.isArray(filteredData) &&
                  filteredData.map((e, i) => (
                    <View style={styles.cardContainer} key={e.OrderNo}>
                      <Text style={styles.textList}>{e.CustomerName}</Text>
                      <Text style={styles.textList}>{e.OrderNo}</Text>
                      <Text style={styles.textList}>{formatDate(e.OrderDate)}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>

      }
    </View>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EC6E51',
  },
  containerTitle: {
    paddingTop: 15,
  },
  titleHeader: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  containerList: {
    paddingBottom: 50,
    marginLeft: 15,
    marginRight: 15
  },
  buttonAdd: {
    width: 85,
    height: 25,
    backgroundColor: "#EC6E51",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20
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
    padding: 15
  },
  containerContent: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerSearch: {
    borderWidth: 1,
    borderColor: "#B9B9B9",
    marginTop: 25,
    borderRadius: 10,
    padding: 10,
    marginLeft: 15,
    marginRight: 15
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
  textList: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    width: '30%'
  }
});
