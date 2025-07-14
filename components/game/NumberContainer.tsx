import {StyleSheet, Text, View, Dimensions} from "react-native"
import Colors from "../../constans/colors"
import {ReactNode} from "react"

interface NumberContainerProps {
    children: ReactNode
}

function NumberContainer({ children }: NumberContainerProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default  NumberContainer

export const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    numberText: {
        fontSize: deviceWidth < 380 ? 28 : 36,
        color: Colors.accent500,
        fontFamily: 'open-sans-bold',
    },
})