import { View, Text, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { MultiSelect } from 'react-native-element-dropdown';
import {Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';


const data = [
    { label: 'HTML', value: '1' },
    { label: 'CSS', value: '2' },
    { label: 'Photoshop', value: '3' },
    { label: 'Figma', value: '4' },
    { label: 'XD', value: '5' },
    { label: 'JavaScript', value: '6' },
    { label: 'Prototype', value: '7' },
    { label: 'Bootstrap', value: '8' },
    { label: 'SCSS', value: '9' },
    { label: 'UI Design', value: '10' },
    { label: 'Illustrator', value: '11' },
    { label: 'SEO', value: '12' },
    { label: 'Responsive', value: '13' },
  ];

type ProfileSkillsScreenProps = StackScreenProps<RootStackParamList, 'ProfileSkills'>;

const ProfileSkills = ({ navigation } : ProfileSkillsScreenProps) => {

    const dispatch = useDispatch();
      
    const { userData } = useSelector((state: any) => state.user);

    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [Skillselected, setSkillSelected] = useState<any>([]);

    const [skillData , setSkillData] = useState<any>([]);

    useEffect(() => {

      const objectArray = userData.JobKeySkills?.Skillselected ? JSON.parse(userData.JobKeySkills.Skillselected) : [];
      const normalArray = objectArray.map((obj: { value: any; }) => obj.value);
      setSkillSelected(normalArray);

    },[]);

    useEffect(() => {

      const commonObjects = data.filter(obj => Skillselected.includes(obj.value));

      setSkillData(commonObjects);

    },[Skillselected]);

    const handleProfileSkills = async () => {
      if(Skillselected.length < 0 ){
        setLoading(false);
          {Platform.OS === 'android' ?
              ToastAndroid.show('Fill in all the fields!' , ToastAndroid.LONG)
            :
              Alert.alert('Fill in all the fields!')
          }
          return false;
      }
      setLoading(true);
      try {
          
          let updateData = {
              JobKeySkills: {
                  Skillselected: JSON.stringify(skillData),
              }
          }
          Auth.updateUser(userData.emailId, updateData)
              .then((user) => {
                  dispatch(updateUser(user));
                  Auth.setAccount(user);
                  setLoading(false);
                  navigation.goBack();
              })
              .catch((error) => {
                  console.error("Error:", error);
                  setLoading(false);
              });
      
      } catch (error) {
          console.error('Fill in fields!', error);
      }
  }

    const renderItem = (item : any) => {
      return (
        <View style={styles.item}>
          <Text style={[styles.selectedTextStyle,{color:colors.title}]}>{item.label}</Text>
          <Feather style={styles.icon} color={COLORS.primary} name="check" size={20} />
        </View>
      );
    };

    return (
        <SafeAreaView
            style={{backgroundColor:colors.card,flex:1}}
        >
           {loading ?
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        height:'100%',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
                :
                null
            }
            <Header
                title={'Skills'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{paddingBottom:10}}>
                        <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title}}>Skills</Text>
                    </View>
                    <View style={{marginBottom:15}}>
                        <MultiSelect
                            style={[styles.dropdown,{backgroundColor:colors.background}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Skills"
                            searchPlaceholder="Search..."
                            search
                            value={Skillselected}
                            onChange={(item:any) => {
                              setSkillSelected(item);
                            }}
                            renderItem={renderItem}
                            renderSelectedItem={(item, unSelect) => (
                                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                  <View style={[styles.selectedStyle,{borderColor:colors.border}]}>
                                      <Text style={[styles.textSelectedStyle,{color:colors.text}]}>{item.label}</Text>
                                      <Feather color={COLORS.primary} name="x" size={17} />
                                  </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Save"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={handleProfileSkills}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 48,
        backgroundColor:COLORS.background,
        paddingHorizontal:10,
        borderRadius:6
      },
      placeholderStyle: {
        color:COLORS.text,
        fontSize: 16,
      },
      selectedTextStyle: {
        ...FONTS.fontMedium,
        fontSize: 14,
        color:COLORS.title,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      icon: {
        marginRight: 5,
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 36,
        borderWidth:1,
        borderColor:COLORS.borderColor,
        marginTop: 10,
        marginRight: 12,
        paddingHorizontal: 15,
        height:36
    
      },
      textSelectedStyle: {
        ...FONTS.fontMedium,
        color:COLORS.text,
        marginRight: 5,
        fontSize: 13,
        lineHeight:16
      },
  });

export default ProfileSkills