import { LogOut } from 'lucide-react-native';
import React from 'react';
import {
    BackHandler,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import GlassView from './GlassView'; // Import your component

interface ExitModalProps {
    visible: boolean;
    onClose: () => void;
    theme: any;
}

const ExitModal = ({ visible, onClose, theme }: ExitModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            <GlassView
                                theme={theme}
                                style={[
                                    styles.glassCard,
                                    { borderColor: theme.border, shadowColor: theme.shadow }
                                ]}
                            >
                                {/* Icon Header */}
                                <View style={[styles.iconContainer, { backgroundColor: theme.inputBg }]}>
                                    <LogOut size={32} color={theme.devotionalPrimary || theme.primary} />
                                </View>

                                {/* Text Content */}
                                <Text style={[styles.title, { color: theme.text }]}>
                                    Leaving so soon?
                                </Text>
                                <Text style={[styles.message, { color: theme.subText }]}>
                                    Are you sure you want to exit the application?
                                </Text>

                                {/* Actions */}
                                <View style={styles.buttonRow}>
                                    {/* Cancel Button */}
                                    <TouchableOpacity
                                        style={[styles.button, styles.cancelButton, { borderColor: theme.border }]}
                                        onPress={onClose}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[styles.buttonText, { color: theme.text }]}>
                                            Stay
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Exit Button */}
                                    {/* Exit Button */}
                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            styles.exitButton,
                                            { backgroundColor: theme.devotionalPrimary || '#D35400' }
                                        ]}
                                        onPress={() => {
                                            onClose(); // 1. Update state to hide modal
                                            
                                            // 2. Wait 200ms for state to update, then exit
                                            setTimeout(() => {
                                                BackHandler.exitApp();
                                            }, 200);
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[styles.buttonText, { color: '#FFF' }]}>
                                            Exit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </GlassView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim background
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        maxWidth: 340,
    },
    glassCard: {
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        // Shadow for depth
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700', // Modern bold
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    exitButton: {
        // Background color set via props
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ExitModal;