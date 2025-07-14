import React, { useEffect } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    useWindowDimensions, TouchableWithoutFeedback,
} from 'react-native'
import Colors from "../../constans/colors"

interface Props {
    visible: boolean
    message: string
    onClose: () => void
    autoCloseMs?: number
}

export default function ModalError({
                                       visible,
                                       message,
                                       onClose,
                                       autoCloseMs = 0,
                                   }: Props) {
    const { width, height } = useWindowDimensions()
    const orientation = width > height ? 'landscape' : 'portrait'

    useEffect(() => {
        if (visible && autoCloseMs) {
            const id = setTimeout(onClose, autoCloseMs)
            return () => clearTimeout(id)
        }
    }, [visible, autoCloseMs, onClose])

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
            supportedOrientations={[orientation]}
        >
            <View style={styles.centered}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <View
                style={[
                    styles.modalContainer,
                    { maxWidth: width < 500 ? '80%' : '60%' },
                ]}
            >
                <Text style={styles.message}>{message}</Text>
                {!autoCloseMs && (
                    <Pressable style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </Pressable>
                )}
            </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    },
    modalContainer: {
        alignSelf: 'center',
        backgroundColor: Colors.white,
        padding: 24,
        borderRadius: 12,
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    message: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 12,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#72063c',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: '#fff',
    },
})
