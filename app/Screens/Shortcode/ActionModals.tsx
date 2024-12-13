import React, { useState } from 'react';
import { Modal, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {Feather } from "@expo/vector-icons";
import LoginModal from '../../components/Modal/LoginModal';
import OptionBar from '../../components/Modal/OptionBar';
import RegisterModal from '../../components/Modal/RegisterModal';
import SuccessModal from '../../components/Modal/SuccessModal';
import Header from '../../layout/Header';
import ListItem from '../../components/list/ListItem';
import { GlobalStyleSheet } from '../../constants/StyleSheet';



const ActionModals = () => {

    const { colors } : {colors : any} = useTheme();

    const [activeSheet, setActiveSheet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const ActionData = [
        {
            icon: "info",
            title: "Confirm modal",
            sheet: 'option',
        },
        {
            icon: "check-circle",
            title: "Success Bar",
            sheet: 'success',
        },
        {
            icon: "log-out",
            title: "Login",
            sheet: 'login',
        },
        {
            icon: "file-text",
            title: "Register",
            sheet: 'register',
        },
    ]

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    position: 'relative',
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,.3)',
                        }}
                    />
                    {activeSheet === "option" ?
                        <OptionBar close={setModalVisible} /> :
                        activeSheet === "success" ?
                            <SuccessModal /> :
                            activeSheet === "login" ?
                                <LoginModal close={setModalVisible} /> :
                                activeSheet === "register" ?
                                    <RegisterModal close={setModalVisible} />
                                    :
                                    <SuccessModal />
                    }
                </View>
            </Modal>

            <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
                <View style={[GlobalStyleSheet.container,{padding:0, backgroundColor: colors.background, flex: 1 }]}>
                    <View
                        style={[{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 2,
                                height: 2,
                            },
                            shadowOpacity: .1,
                            shadowRadius: 5,
                        }, Platform.OS === "ios" && {
                            backgroundColor: colors.card,
                        }]}
                    >
                        <Header
                            titleLeft
                            title={'Modal Box'}
                            leftIcon={'back'}
                        />
                    </View>
                    <ScrollView>
                        <View style={{ paddingBottom: 15, paddingTop: 15 }}>
                            {ActionData.map((data:any, index:any) => {
                                return (
                                    <ListItem
                                        key={index}
                                        icon={<Feather size={16} color={colors.title} name={data.icon} />}
                                        title={data.title}
                                        onPress={() => { setActiveSheet(data.sheet); setModalVisible(true) }}
                                    />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default ActionModals;