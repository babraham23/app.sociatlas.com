import React from 'react';
import { Text as DefaultText, StyleSheet, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = {
    style?: any;
    color?: string;
    fontSize?: number;
    bold?: boolean;
    textDecorationLine?: any;
    center?: boolean;
    children: any;
    noEnd?: boolean;
    numberOfLines?: number;
    lineHeight?: number;
    textAlign?: any
};

export const Text = ({ style, color, fontSize, bold, textDecorationLine, center, children, numberOfLines, lineHeight, textAlign }: Props) => {
    const { colors }: any = useTheme();
    const styles = StyleSheet.create({
        text: {
            fontSize: fontSize ? fontSize : 16,
            fontFamily: bold ? 'bold' : 'regular',
            textAlign: textAlign ? textAlign : (center ? 'center' : 'left'),
            textDecorationLine: textDecorationLine ? textDecorationLine : 'none',
            color: color ? color : colors.text,
            lineHeight: lineHeight ? lineHeight : (fontSize ? fontSize + 10 : 20),
        },
    });
    return (
        <DefaultText numberOfLines={numberOfLines} style={[style, styles.text]}>
            {children}
        </DefaultText>
    );
};


// export const HeaderText = ({ style, color, fontSize, bold, textDecorationLine, center, children, noEnd }: Props) => {
//     const { colors }: any = useTheme();
//     const styles = StyleSheet.create({
//         view: {
//             flexDirection: 'row',
//         },
//         text: {
//             fontSize: fontSize ? fontSize : 23,
//             fontFamily: bold ? 'bold' : 'regular',
//             textAlign: center ? 'center' : 'left',
//             textDecorationLine: textDecorationLine ? textDecorationLine : 'none',
//             color: color ? color : colors.text,
//         },
//     });
//     return (
//         <View style={styles.view}>
//             <DefaultText style={[style, styles.text]}>{children}</DefaultText>
//             {!noEnd ? <DefaultText style={[styles.text, { color: colors.primary }]}>.</DefaultText> : null}
//         </View>
//     );
// };

{
    /* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }, */
}
