import {View, StyleSheet, FlatList, useWindowDimensions} from "react-native"
import Title from "../components/ui/Title"
import {useCallback, useEffect, useRef, useState} from "react"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"
import GuessLogItem from "../components/game/GuessLogItem"
import ModalError from "../components/game/ModalError"
import {useTranslation} from "react-i18next"

interface GameScreenProps {
    userNumber: number,
    onGameOver: (rounds: number) => void
}

type Direction = 'lower' | 'greater'

function generateRandomNumber(min: number, max: number, exclude: number): number {
    if (min > max) throw new Error('Range is exhausted')

    if (min === max) {
        if (min === exclude) throw new Error('No numbers left')
        return min
    }

    const size = max - min + 1 - (exclude >= min && exclude <= max ? 1 : 0)

    let rnd = Math.floor(Math.random() * size) + min
    if (exclude >= min && exclude <= max && rnd >= exclude) rnd += 1
    return rnd
}

function GameScreen({userNumber, onGameOver}: GameScreenProps ) {
    const minBoundary = useRef(1)
    const maxBoundary = useRef(99)

    const [currentGuess, setCurrentGuess] = useState<number>(() => {
        minBoundary.current = 1
        maxBoundary.current = 99
        return generateRandomNumber(1, 99, userNumber)
    })
    const [guessRounds, setGuessRounds] = useState<number[]>([currentGuess])
    const [modalVisible, setModalVisible] = useState(false)
    const {width} = useWindowDimensions()
    const { t } = useTranslation()

    useEffect(() => {
        if (currentGuess === userNumber) onGameOver(guessRounds.length)
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary.current = 1
        maxBoundary.current = 99
    }, [])

    const nextGuessHandler = useCallback(
        (direction: Direction) => {
            const lie =
                (direction === 'lower'   && currentGuess < userNumber) ||
                (direction === 'greater' && currentGuess > userNumber)

            if (lie) {
                setModalVisible(true)
                return
            }

            if (direction === 'lower') {
                maxBoundary.current = currentGuess - 1
            } else {
                minBoundary.current = currentGuess + 1
            }

            if (minBoundary.current > maxBoundary.current) {
                onGameOver(guessRounds.length)
                return
            }
            const newRnd = generateRandomNumber(
                minBoundary.current,
                maxBoundary.current,
                currentGuess
            )

            setCurrentGuess(newRnd)
            setGuessRounds(prev => [newRnd, ...prev])
        },
        [currentGuess, userNumber, onGameOver]
    )

    const guessRoundsListLength = guessRounds.length

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText>{t('guessHint')}</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                        {t('buttonLower')}
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                        {t('buttonHigher')}
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 800) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                            {t('buttonLower')}
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                            {t('buttonHigher')}
                        </PrimaryButton>
                    </View>
                </View>
            </>
        )
    }
    return (
        <View style={styles.screen}>
            <Title>{t('opponentGuess')}</Title>
            {content}
            <View style={[styles.listContainer, { maxWidth: width < 500 ? '100%' : '80%' }]}>
                <FlatList
                    style={styles.flatList}
                    data={guessRounds}
                    renderItem={(itemData) =>
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}/>}
                    keyExtractor={(item, index) => `${item}-${index}`}
                />
            </View>
            <ModalError
                visible={modalVisible}
                message={t('dontLie')}
                onClose={() => setModalVisible(false)}
                autoCloseMs={1500}
            />
        </View>
    )
}
export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12,
        alignItems: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    buttonContainer: {
        flex: 1,
    },
    buttonsContainerWide: {
        flexDirection: "row",
        alignItems: "center",
        width: "60%",
    },
    listContainer: {
        flex: 1,
        padding: 8,
    },
    flatList: {
        padding: 16,
    },
})