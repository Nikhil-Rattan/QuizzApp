import React, { FC } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../constants/colors';

interface CustomButtonProps {
    hasSingleButton?: boolean;
    onBtnPress?: () => void;
    singleBtnTitle?: string;
    leftBtnTitle?: string;
    onLeftBtnPress?: () => void;
    onRightBtnPress?: () => void;
    rightBtnTitle?: string;
    btnContainerStyle?: object
}

const CustomButton: FC<CustomButtonProps> = ({
    hasSingleButton = false,
    onBtnPress,
    singleBtnTitle,
    onLeftBtnPress,
    leftBtnTitle = 'Prev',
    onRightBtnPress,
    rightBtnTitle = 'Next',
    btnContainerStyle
}) => {
    return (
        <>
            {!!hasSingleButton ?
                <TouchableOpacity activeOpacity={0.7}
                    onPress={onBtnPress}
                    style={[styles.singleBtnStyle,btnContainerStyle]}>
                    <Text style={styles.titleStyle}>{singleBtnTitle}</Text>
                </TouchableOpacity>
                :
                <View style={[styles.btnContainer, btnContainerStyle]}>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={onLeftBtnPress}
                        style={styles.btnStyle}
                    >
                        <Text style={styles.titleStyle}>{leftBtnTitle}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={onRightBtnPress}
                        style={styles.btnStyle}>
                        <Text style={styles.titleStyle}>{rightBtnTitle}</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    )
}

export default CustomButton
const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'100%'
    },
    btnStyle: {
        width: '40%',
        backgroundColor: colors.blue,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10
    },
    titleStyle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600'
    },
    singleBtnStyle: {
        backgroundColor: colors.blue,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        width: '100%'
    }
})
