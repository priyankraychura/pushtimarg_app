import { RefreshCw, WifiOff } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorViewProps {
    theme: any;
    message?: string;
    onRetry: () => void;
}

const { width } = Dimensions.get('window');

const ErrorView = ({ theme, message = "Connection lost", onRetry }: ErrorViewProps) => {
    return (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
            
            {/* Decorative Background Element (Subtle Depth) */}
            <View 
                style={[
                    styles.decorativeCircle, 
                    { 
                        borderColor: theme.border,
                        backgroundColor: theme.inputBg, // Very subtle tint
                    }
                ]} 
            />

            {/* Main Content */}
            <View style={styles.content}>
                
                {/* Large Icon */}
                <View style={styles.iconWrapper}>
                    <WifiOff 
                        size={64} 
                        color={theme.devotionalPrimary || theme.text} 
                        strokeWidth={1.5}
                    />
                </View>

                {/* Typography */}
                <Text style={[styles.title, { color: theme.text }]}>
                    Oops, No Internet
                </Text>
                
                <Text style={[styles.message, { color: theme.subText }]}>
                    {message}. Please check your connection and try again.
                </Text>

                {/* Action Button */}
                <TouchableOpacity 
                    onPress={onRetry}
                    activeOpacity={0.8}
                    style={[
                        styles.button, 
                        { 
                            backgroundColor: theme.devotionalPrimary || theme.text,
                            shadowColor: theme.devotionalPrimary || theme.text,
                        }
                    ]}
                >
                    <RefreshCw size={20} color="#FFFFFF" strokeWidth={2.5} style={styles.btnIcon} />
                    <Text style={styles.btnText}>Retry</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    decorativeCircle: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: (width * 0.8) / 2,
        borderWidth: 1,
        opacity: 0.5,
        zIndex: -1, // Behind content
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 40,
        width: '100%',
    },
    iconWrapper: {
        marginBottom: 30,
        // Optional: Add a subtle glow or shadow if desired
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        opacity: 0.8,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 50,
        minWidth: 180,
        // Modern Soft Shadow
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    btnIcon: {
        marginRight: 12,
    },
    btnText: {
        color: '#FFFFFF',
        fontWeight: '600', // Modern Sans-serif weight
        fontSize: 16,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});

export default ErrorView;