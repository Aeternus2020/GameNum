import {View, Image, StyleSheet, Text, useWindowDimensions, ScrollView} from "react-native"
import Title from "../components/ui/Title"
import Colors from "../constans/colors"
import PrimaryButton from "../components/ui/PrimaryButton"
import { useTranslation } from 'react-i18next';

interface GameOverScreenProps {
    roundsNumber: number,
    userNumber: number,
    onStartNewGame: () => void,
}
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}: GameOverScreenProps) {
    const {width, height} = useWindowDimensions()
    const { t } = useTranslation()

    let imageSize = 300
    if (width < 380) imageSize = 200
    if (height < 450) imageSize = 150

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        margin: imageSize / 12,
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>{t('gameOver')}</Title>
                <View style={[styles.imageContainer, imageStyle ]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')} />
                </View>
                <Text style={styles.summaryText}>
                    {t('summaryPrefix')}
                    <Text style={styles.highlight}> {roundsNumber} </Text>
                    {t('summarySuffix')}
                    <Text style={styles.highlight}> {userNumber} </Text>
                </Text>
                <PrimaryButton onPress={onStartNewGame}>{t('newGame')}</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: Colors.primary700,
        overflow: "hidden",
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})