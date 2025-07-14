import {Text, StyleSheet} from "react-native"
import Colors from "../../constans/colors"

interface TitleProps {
    children: string,
}

function Title({children}: TitleProps) {
    return (
    <Text style={styles.title}>{children}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 26,
        color: Colors.white,
        textAlign: "center",
        padding: 12,
        paddingTop: 24,
        maxWidth: '85%',
        width: 300,
    }
})