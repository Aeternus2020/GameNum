import {StyleSheet, Text} from "react-native"
import {ReactNode} from "react"
import Colors from "../../constans/colors"

interface InstructionTextProps {
    children: string | ReactNode
}

function InstructionText({children}: InstructionTextProps): ReactNode {
    return <Text style={styles.instructionText}>{children}</Text>
}

export default InstructionText

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        color: Colors.accent500,
        textAlign: 'center',
    },
})