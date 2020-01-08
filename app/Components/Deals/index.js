import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';
import CardView from 'react-native-rn-cardview';
import styles from './styles/styles';

export const Deals = props => (
  <View style={styles.containerDeals}>
    <View style={styles.subContainerDeals}>
      <FlatList
        horizontal={true}
        style={{flexGrow: 0}}
        data={props.allDeal}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.onPressDeal({
                  active: true,
                  id: index,
                  selectedDeal: true,
                })
              }
              style={{height: 100}}>
              <View style={styles.dealCardStyle}>
                <CardView
                  cardElevation={5}
                  maxCardElevation={5}
                  radius={10}
                  backgroundColor={Colors.white}>
                  <View
                    style={
                      props.active &&
                      (props.selectedDeal
                        ? props.id === index
                        : props.idDeal === index)
                        ? styles.activeDeal
                        : styles.inActiveDeal
                    }>
                    <View style={styles.textDeal}>
                      <Text
                        style={
                          props.active &&
                          (props.selectedDeal
                            ? props.id === index
                            : props.idDeal === index)
                            ? {marginTop: 15, fontSize: 10, color: 'white'}
                            : {
                                marginTop: 15,
                                fontSize: 10,
                                color: Colors.semiPink,
                              }
                        }>
                        {item.start_time}pm
                      </Text>
                      <Text
                        style={
                          props.active &&
                          (props.selectedDeal
                            ? props.id === index
                            : props.idDeal === index)
                            ? {fontSize: 17, color: 'white'}
                            : {fontSize: 17, color: Colors.semiPink}
                        }>
                        {item.discount}%
                      </Text>
                    </View>
                  </View>
                </CardView>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  </View>
);
