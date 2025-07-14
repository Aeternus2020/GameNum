import {StyleSheet, View} from "react-native"
import Colors from "../../constans/colors"
import {ReactNode} from "react"
import {deviceWidth} from "../game/NumberContainer"

interface CardProps {
    children: string | ReactNode
}

function Card({children}: CardProps) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: deviceWidth < 380 ? 18 : 24,
        marginHorizontal: 24,
        padding: 16,
        maxWidth: deviceWidth < 500 ? '100%' : '70%',
        backgroundColor: Colors.primary700,
        elevation: 4,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
})