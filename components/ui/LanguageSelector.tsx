import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constans/colors'

const languages = [
    { label: 'English', code: 'en' },
    { label: 'Русский', code: 'ru' },
    { label: 'Українська', code: 'ua' },
    { label: 'Polski', code: 'pl' },
]

export default function LanguageSelector({onSelect, onClose,}: {
    onSelect: (code: string) => void;
    onClose: () => void;
}) {
    return (
        <Pressable style={styles.overlay} onPress={onClose}>
            <View style={styles.box}>
                <Text style={styles.title}>Choose language</Text>
                <FlatList
                    data={languages}
                    keyExtractor={item => item.code}
                    renderItem={({ item }) => (
                        <Pressable style={styles.item}
                            onPress={() => {
                                onSelect(item.code)
                                onClose()
                        }}>
                            <Text style={styles.itemText}>{item.label}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center',
        zIndex: 1000,
        elevation: 1000,
    },
    box: {
        width: 200,
        backgroundColor: Colors.white,
        padding:24,
        borderRadius:12,
        elevation: 10,
        shadowColor: Colors.black,
    },
    title: {
        fontSize:16,
        fontWeight:'bold',
        marginBottom:12,
        textAlign:'center',
    },
    item: { paddingVertical:8 },
    itemText: { fontSize:16 },
})
