import React from 'react';
import Svg, { Text } from 'react-native-svg';
import { useTheme } from '@react-navigation/native'

const Paragraph = ({ fontSize, fill, title, fontFamily, stroke } : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <Svg height="150" width="680">
            <Text
                fill={fill}
                stroke={stroke}
                fontSize={fontSize}
                // fontWeight="bold"
                fontFamily={fontFamily}
                x="110"
                y="70"
            >
                {title}
            </Text>
        </Svg>
    )
}

export default Paragraph;