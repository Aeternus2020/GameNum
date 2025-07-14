import './i18n'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet,
    ImageBackground,
    SafeAreaView,
    } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import StartGameScreen from "./screens/StartGameScreen"
import {useCallback, useEffect, useState} from "react"
import GameScreen from "./screens/GameScreen"
import Colors from "./constans/colors"
import GameOverScreen from "./screens/GameOverScreen"
import {useFonts} from "expo-font"
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from "@react-native-async-storage/async-storage"
import i18n from "i18next"
import {I18nextProvider} from "react-i18next"
import LanguageSelector from "./components/ui/LanguageSelector"
import DraggableLangButton from "./components/ui/DraggableLangButton"

export default function App() {
    const [userNumber, setUserNumber] = useState<number | null>(null)
    const [gameIsOver, setGameIsOver] = useState<boolean>(true)
    const [guessRounds, setGuessRounds] = useState<number>(0)
    const [ready, setReady] = useState(false)
    const [showLangModal, setShowLangModal] = useState(false)

    useEffect(() => {
        (async () => {
            const saved = await AsyncStorage.getItem('appLanguage')
            if (saved) {
                await i18n.changeLanguage(saved)
            } else {
                setShowLangModal(true)
            }
            setReady(true)
        })()
    }, [])

    const gameOverHandler = useCallback((numberOfRounds: number) => {
        setGameIsOver(true)
        setGuessRounds(numberOfRounds)
    }, [])

    const pickedNumberHandler = useCallback((pickedNumber: number) => {
        setUserNumber(pickedNumber)
        setGameIsOver(false)
    }, [])

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })

    useEffect(() => {
        if (fontsLoaded /* && любые другие async-данные */) {
            SplashScreen.hideAsync().catch(() => {})
        }
    }, [fontsLoaded])

    if (!fontsLoaded || !ready) return null

    function startNewGameHandler(){
        setUserNumber(null)
        setGuessRounds(0)
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen
            userNumber={userNumber}
            roundsNumber={guessRounds}
            onStartNewGame={startNewGameHandler}/>
    }

  return (
      <I18nextProvider i18n={i18n}>
        <LinearGradient colors={[Colors.primary600, Colors.accent500]} style={styles.rootScreen}>
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
              <StatusBar style="light" />
                <SafeAreaView style={styles.rootScreen}>
                    {screen}
                </SafeAreaView>
                <DraggableLangButton
                    label={i18n.language.toUpperCase()}
                    onPress={() => setShowLangModal(true)}
                />
            </ImageBackground>
        </LinearGradient>
          {showLangModal && (
                 <LanguageSelector
                   onSelect={lang => {
                     void i18n.changeLanguage(lang)
                     void AsyncStorage.setItem('appLanguage', lang)
                   }}
                   onClose={() => setShowLangModal(false)}
                 />
          )}
      </I18nextProvider>
  )
}

const styles = StyleSheet.create ({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.2
    },
})