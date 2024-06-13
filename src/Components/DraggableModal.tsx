// DraggableModal.js
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Animated, TextInput } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const DraggableModal = () => {
    const [translateX] = useState(new Animated.Value(0));
    const [translateY] = useState(new Animated.Value(0));
    const lastOffset = useRef({ x: 0, y: 0 }).current;
    const [isChange, setIsChange] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleGesture = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
        { useNativeDriver: true }
    );

    const handleStateChange = (event:any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += event.nativeEvent.translationX;
            lastOffset.y += event.nativeEvent.translationY;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Type something..." />
            <Text style={styles.closeButton} onPress={() => setIsOpen(true)}>
                Open modal
            </Text>
            {isOpen && (
                isChange ? (
                    <View style={styles.fullContainer}>
                        <Text style={styles.closeButton} onPress={() => setIsOpen(false)}>
                            Close Modal
                        </Text>
                        <Text style={styles.closeButton} onPress={() => setIsChange(!isChange)}>
                            Change height and width
                        </Text>
                    </View>
                ) : (
                    <PanGestureHandler
                        onGestureEvent={handleGesture}
                        onHandlerStateChange={handleStateChange}
                    >
                        <Animated.View
                            style={[
                                styles.draggableContainer,
                                { transform: [{ translateX: translateX }, { translateY: translateY }] },
                            ]}
                        >
                            <Text style={styles.closeButton} onPress={() => setIsOpen(false)}>
                                Close Modal
                            </Text>
                            <Text style={styles.closeButton} onPress={() => setIsChange(!isChange)}>
                                Change height and width
                            </Text>
                            <Text>Drag me around!</Text>
                        </Animated.View>
                    </PanGestureHandler>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    fullContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    draggableContainer: {
        width: 300,
        height: 200,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 200, // Initial position of the modal
    },
    closeButton: {
        fontSize: 20,
        color: 'red',
        marginBottom: 10,
    },
});

export default DraggableModal;
