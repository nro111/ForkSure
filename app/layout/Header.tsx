import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { COLORS, FONTS,} from '../constants/theme';
import {Feather } from "@expo/vector-icons";
import { useNavigation, useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { IMAGES } from '../constants/Images';

const Header = (props: { productId?: any; transparent?: any; paddingLeft?: any; leftIcon?: any;leftIcon2?: any;  backAction?: any; titleLeft?: any; title?: any; rightIcon2?: any; rightIcon?: any; rightIcon3?: any; rightIcon4?: any;rightIcon5?:any ;rightIcon6?: any; handleLike?: any; isLike?: any; grid?: any; handleLayout?: any; layout?: any;onPress ? : any; }) => {

    const navigation = useNavigation<any>();

    const theme = useTheme();
    const { colors }: {colors :any} = theme;

    const { grid, handleLayout, layout } = props;

    return (
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
            <View
                style={[{
                    height: props.productId ? 60 : 60,
                    backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                    borderBottomWidth:1,
                    borderBottomColor:colors.border
                }, props.transparent && {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    borderBottomWidth: 0,
                }]}
            >
                <View 
                    style={[GlobalStyleSheet.container, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft:props.paddingLeft ? 15 : 0,
                        justifyContent: 'space-between',
                        paddingTop:10
                    }]}
                >
                    {props.leftIcon == "back" &&
                        <IconButton
                            onPress={() => props.backAction ? props.backAction() : navigation.goBack()}
                            icon={props => <Feather name="arrow-left" {...props} />}
                            iconColor={colors.text}
                            size={20}
                        />
                    }
                    {props.leftIcon2 == "menu" &&
                        <IconButton
                            onPress={props.onPress}
                            iconColor={colors.text}
                            size={20}
                            icon={prop =>
                                <Image {...props} style={{ height:16, width: 22, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.menu} />
                            }
                        />
                    }
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title,lineHeight:18 ,textAlign: props.titleLeft ? 'left' : 'center' }}>{props.title}</Text>
                        {props.productId &&
                            <Text style={{ ...FONTS.fontSm, color: colors.text, textAlign: 'center', marginTop: 2 }}>{props.productId}</Text>
                        }
                    </View>
                    {props.rightIcon == "cart" &&
                        <IconButton
                            onPress={props.onPress}
                            size={20}
                            iconColor={colors.title}
                            icon={prop =>
                                <Image {...prop} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.shopping} />
                            }
                        />
                    }
                    {props.rightIcon2 == "search" &&
                        <IconButton
                            onPress={() => navigation.navigate('Search')}
                            size={20}
                            iconColor={COLORS.primary}
                            icon={props => <Feather name="search" {...props} />}
                            />
                        }
                    {props.rightIcon3 == "home" &&
                        <IconButton
                        onPress={() => navigation.navigate('DrawerNavigation')}
                        size={20}
                        iconColor={colors.title}
                        icon={props => <Feather name="home" {...props} />}
                        />
                    }
                    {props.rightIcon4 == "chat" &&
                        <IconButton
                        onPress={() => navigation.navigate('SingleChat')}
                        size={20}
                        iconColor={colors.title}
                        icon={props => <Image {...props} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.comment} />}
                        />
                    }
                    {props.rightIcon5 == "save" &&
                        <IconButton
                            onPress={props.onPress}
                            size={20}
                            iconColor={colors.text}
                            icon={props => <Feather name="bookmark" {...props} />}
                        />
                    }
                    {props.rightIcon6 == "Visit" &&
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <IconButton
                                onPress={props.onPress}
                                size={16}
                                iconColor={COLORS.primary}
                                icon={props => <Feather name="globe" {...props} />}
                            />
                            <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary,marginLeft:-8,lineHeight:16}}>Visit</Text>
                        </View>
                    }
                    {grid &&
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleLayout('grid')}
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'grid' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleLayout('list')}
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'list' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid2}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};



export default Header;