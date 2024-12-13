import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import BusinessIcon from '../Icons/BusinessNameIcon';

type ReceiptCardProps = {
  merchantName: string;
  merchantAddress: string;
  transactionDate: string;
  transactionTotal: string;
  onPress?: () => void; // Optional press handler
};

const ReceiptCard = ({
  merchantName,
  merchantAddress,
  transactionDate,
  transactionTotal,
  onPress,
}: ReceiptCardProps) => {
    const theme = useTheme();
    const { colors } : {colors : any } = theme;
    return (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.header}>
            {/* Merchant Icon */}
            <View style={styles.iconContainer}>
              <BusinessIcon businessName={merchantName} />
            </View>
            
            {/* Merchant Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.merchantName}>{merchantName}</Text>
              <Text style={styles.transactionDate}>{transactionDate}</Text>
            </View>
          </View>
    
          {/* Transaction Info */}
          <View style={styles.transactionInfo}>
            <View style={styles.addressContainer}>
              <Image style={styles.mapIcon} source={IMAGES.map} />
              <Text style={styles.merchantAddress}>{merchantAddress}</Text>
            </View>
            <Text style={styles.transactionTotal}>${transactionTotal}</Text>
          </View>
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 18,
      marginVertical: 10,
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 6,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },
    iconContainer: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: "#007AFF",
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      marginLeft: -10      
    },
    icon: {
      height: 35,
      width: 35,
      resizeMode: 'contain',
    },
    detailsContainer: {
      flex: 1,
    },
    merchantName: {
      ...FONTS.fontSemiBold,
      fontSize: 15,
      color: COLORS.black,
    },
    transactionDate: {
      ...FONTS.fontRegular,
      fontSize: 12,
      color: COLORS.gray,
    },
    transactionInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    transactionTotal: {
      ...FONTS.fontBold,
      fontSize: 16,
      color: COLORS.primary,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mapIcon: {
      height: 16,
      width: 16,
      resizeMode: 'contain',
      tintColor: COLORS.text,
      marginRight: 6,
    },
    merchantAddress: {
      ...FONTS.fontMedium,
      fontSize: 12,
      color: COLORS.text,
      lineHeight: 18,
    },
  });

export default ReceiptCard;
