import React, { useRef, useEffect, useMemo } from 'react'
import {
    Animated,
    PanResponder,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    GestureResponderEvent,
    PanResponderGestureState,
} from 'react-native'
import Colors from '../../constans/colors'

const BUTTON = 60
const MARGIN = 16

export default function DraggableLangButton({
                                                label,
                                                onPress,
                                            }: {
    label: string
    onPress: () => void
}) {
    const { width, height } = useWindowDimensions()

    const workW = width  - BUTTON - 2 * MARGIN
    const workH = height - BUTTON - 2 * MARGIN

    const ratioRef = useRef({ x: 1, y: 1 })
    const pos      = useRef(
        new Animated.ValueXY({
            x: MARGIN + ratioRef.current.x * workW,
            y: MARGIN + ratioRef.current.y * workH,
        })
    ).current

    useEffect(() => {
        const { x, y } = ratioRef.current
        pos.setValue({
            x: MARGIN + x * (width  - BUTTON - 2 * MARGIN),
            y: MARGIN + y * (height - BUTTON - 2 * MARGIN),
        })
    }, [width, height])

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

    const updatePosition = (xRatio: number, yRatio: number) => {
        pos.setValue({
            x: MARGIN + xRatio * (width  - BUTTON - 2 * MARGIN),
            y: MARGIN + yRatio * (height - BUTTON - 2 * MARGIN),
        })
    }

    const panResponder = useMemo(() => {
        const handleMove = (_: GestureResponderEvent, g: PanResponderGestureState) => {
            const pxX = MARGIN + ratioRef.current.x * workW + g.dx
            const pxY = MARGIN + ratioRef.current.y * workH + g.dy

            const rX  = clamp01((pxX - MARGIN) / workW)
            const rY  = clamp01((pxY - MARGIN) / workH)

            updatePosition(rX, rY)
        }

        const finishMove = (g: PanResponderGestureState) => {
            const pxX = MARGIN + ratioRef.current.x * workW + g.dx
            const pxY = MARGIN + ratioRef.current.y * workH + g.dy

            ratioRef.current = {
                x: clamp01((pxX - MARGIN) / workW),
                y: clamp01((pxY - MARGIN) / workH),
            }
            updatePosition(ratioRef.current.x, ratioRef.current.y)
        }

        return PanResponder.create({
            onMoveShouldSetPanResponder: (_, { dx, dy }) =>
                Math.abs(dx) > 5 || Math.abs(dy) > 5,

            onPanResponderMove: handleMove,
            onPanResponderRelease: (_e, g) => finishMove(g),
            onPanResponderTerminate: (_e, g) => finishMove(g),
        })
    }, [width, height, workW, workH])
    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.container, { transform: pos.getTranslateTransform() }]}
        >
            <Pressable onPress={onPress} style={styles.button}>
                <Text pointerEvents="none" style={styles.text}>
                    {label.toUpperCase()}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: { position: 'absolute' },
    button: {
        width: BUTTON,
        height: BUTTON,
        borderRadius: BUTTON / 2,
        backgroundColor: '#ddb52f',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
})
