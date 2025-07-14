import {TextInput, View, StyleSheet, useWindowDimensions, KeyboardAvoidingView, ScrollView} from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import {useState} from "react"
import Colors from "../constans/colors"
import Title from "../components/ui/Title"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"
import ModalError from "../components/game/ModalError";
import {useTranslation} from "react-i18next";

interface StartGameScreenProps {
    onPickNumber: (pickedNumber: number) => void
}

function StartGameScreen({ onPickNumber }: StartGameScreenProps) {
    const [enteredNumber, setEnteredNumber] = useState('')
    const {height} = useWindowDimensions()
    const [modalVisible, setModalVisible] = useState(false)
    const { t } = useTranslation();

    function numberInputHandler(enteredText: string) {
        setEnteredNumber(enteredText)
    }

    function resetInputHandler() {
        setEnteredNumber('')
    }
    function confirmInputHandler() {
        const choseNumber = parseInt(enteredNumber)

        if(isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            resetInputHandler()
            setModalVisible(true)
            return
        }
        onPickNumber(choseNumber)
    }

    const marginTopDistance = height < 380 ? 30 : 80

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>{t('guessNumber')}</Title>
                <Card>
                    <InstructionText>{t('enterNumber')}</InstructionText>
                    <TextInput
                        style={styles.numberInput}
                        maxLength={2}
                        keyboardType="number-pad"
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={resetInputHandler}>{t('reset')}</PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={confirmInputHandler}>{t('confirm')}</PrimaryButton>
                        </View>
                    </View>
                </Card>
                </View>
            </KeyboardAvoidingView>
            <ModalError
                visible={modalVisible}
                message={t('invalidNumber')}
                onClose={() => setModalVisible(false)}
            />
        </ScrollView>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: "center",
    },
    instructionText: {
        fontSize: 24,
        color: Colors.accent500,
    },
    numberInput: {
        height: 60,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
   },
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    buttonContainer: {
        flex: 1,
    }
})