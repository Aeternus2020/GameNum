import { View, Text, StyleSheet } from 'react-native'
import Colors from "../../constans/colors"
import {useTranslation} from "react-i18next";

interface GuessLogItemProps {
    roundNumber: number,
    guess: number,
}

function GuessLogItem({ roundNumber, guess }: GuessLogItemProps) {
    const { t } = useTranslation()

    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>{t('opponentGuess')}: {guess}</Text>
        </View>
    )
}

export default GuessLogItem

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary700,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    itemText: {
        fontFamily: 'open-sans'
    }
})