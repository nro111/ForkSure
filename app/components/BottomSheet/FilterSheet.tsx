import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Button from '../Button/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';

type Props = {
  sheetRef :any
}

const FilterSheet2 = ({sheetRef} : Props) => {
  
  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const navigation = useNavigation<any>();

  const brandData = ["Adidas", "Reebok", "Zara", "Gucci", "Vogue"];

  const [activeSize, setActiveSize] = useState(brandData[0]);

  const categoriesData = ["All", "Bra", "Panty", "LookMe", "Dress", "Nightwear", "Jackets"];

  const [active1Size, setActive1Size] = useState(categoriesData[0]);

  const sizeData = ["Small", "Medium", "Large", "XL", "2Xl"];

  const [active2Size, setActive2Size] = useState(sizeData[0]);

  const [multiSliderValue, setMultiSliderValue] = useState([200, 270])

  const multiSliderValuesChange = (values: any) => setMultiSliderValue(values)

  return (
      <View style={[GlobalStyleSheet.container, { paddingTop: 0 }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingVertical: 15,
            marginHorizontal: -15,
            paddingHorizontal: 15
          }}
        >
            <Text style={[FONTS.fontMedium, { color: colors.title, fontSize: 20 }]}>Filters</Text>
            <TouchableOpacity
              style={{ height: 38, width: 38, backgroundColor: colors.card,alignItems: 'center', justifyContent: 'center' }}
              onPress={() => sheetRef.current.close()}
            >
              <Image
                style={{ width:22, height:22, resizeMode: 'contain', tintColor: colors.title }}
                source={IMAGES.close}
              />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 17, color: colors.title }}>Brand</Text>
              <TouchableOpacity
                  onPress={() => sheetRef.current.close()}
              >
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:COLORS.danger }}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 5 }}>
              {brandData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveSize(data)}
                    key={index}
                    style={[{
                      backgroundColor: colors.background,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      marginBottom: 5
                    }, activeSize === data && {
                      backgroundColor: colors.title,
                      borderColor: COLORS.primary,
                    }]}
                  >
                    <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, activeSize === data && {  color:colors.card}]}>{data}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 17, color: colors.title }}>Categories:</Text>
              <TouchableOpacity
                  onPress={() => sheetRef.current.close()}
              >
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:COLORS.danger }}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
              {categoriesData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActive1Size(data)}
                    key={index}
                    style={[{
                      backgroundColor: colors.background,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      marginBottom: 5
                    }, active1Size === data && {
                      backgroundColor: colors.title,
                      borderColor: COLORS.primary,
                    }]}
                  >
                    <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, active1Size === data && {  color:colors.card}]}>{data}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 17, color: colors.title }}>Size:</Text>
              <TouchableOpacity
                  onPress={() => sheetRef.current.close()}
              >
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:COLORS.danger }}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
              {sizeData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActive2Size(data)}
                    key={index}
                    style={[{
                      backgroundColor: colors.background,
                      height: 34,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      marginBottom: 5
                    }, active2Size === data && {
                      backgroundColor:colors.title,
                      borderColor: COLORS.primary,
                    }]}
                  >
                    <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, active2Size === data && { color:colors.card }]}>{data}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 17, color: colors.title }}>Price:</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: colors.title, backgroundColor: colors.background, textAlign: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>${multiSliderValue[0]} </Text>
                <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: colors.title, backgroundColor: colors.background, textAlign: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>${multiSliderValue[1]}</Text>
              </View>
              <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                sliderLength={340}
                selectedStyle={{ backgroundColor:COLORS.danger, }}
                containerStyle={{ alignSelf: 'center', marginTop: -10 }}
                onValuesChange={multiSliderValuesChange}
                markerStyle={{
                  ...Platform.select({
                    android: {
                      height:12,
                      width: 12,
                      borderRadius:2,
                      backgroundColor:COLORS.danger,
                    }
                  })
                }}
                min={200}
                max={270}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
              />

            </View>
            <View style={{ flexDirection: 'row', gap: 10, paddingRight: 10, marginTop: 20,marginBottom:50 }}>
              <View style={{ width: '50%' }}>
                <Button
                  onPress={() => sheetRef.current.close()}
                  title={"Reset"}
                  text={colors.title}
                  color={colors.background}
                />
              </View>
              <View style={{ width: '50%' }}>
                <Button
                  onPress={() => sheetRef.current.close()}
                  title={"Apply"}
                  color={theme.dark ? COLORS.white :COLORS.primary}
                  text={colors.card}
                />
              </View>
            </View>
        </ScrollView>
      </View>
  );
};

export default FilterSheet2;
