import {Pressable, StyleSheet, Text, View} from "react-native"
import Colors from "../../constans/colors"
import {ReactNode} from "react"

interface PrimaryButtonProps {
    children: string | ReactNode,
    onPress: () => void,
}

function PrimaryButton({children, onPress}: PrimaryButtonProps) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({pressed}) => pressed
                    ? [styles.buttonInnerContainer, styles.pressed]
                    : styles.buttonInnerContainer }
                onPress={onPress}
                android_ripple={{color: Colors.primary700}}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary400,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.white,
        textAlign: "center",
    },
    pressed: {
        opacity: 0.75,
    }
})