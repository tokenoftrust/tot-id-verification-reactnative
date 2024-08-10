// file: src/components/EmailSelectionModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const EmailSelectionModal = ({ visible, emailRecords, onSubmit }) => {
    const [inputEmail, setInputEmail] = useState('');

    const handleEmailSubmit = (email) => {
        onSubmit(email);
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={() => {}}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select or Enter Your Email</Text>
                    {emailRecords.map((record, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            onPress={() => handleEmailSubmit(record.email)}
                        >
                            <Text style={styles.buttonText}>{record.email}</Text>
                        </TouchableOpacity>
                    ))}
                    <TextInput
                        style={styles.input}
                        onChangeText={setInputEmail}
                        value={inputEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleEmailSubmit(inputEmail)}
                    >
                        <Text style={styles.buttonText}>Submit New Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
});

export default EmailSelectionModal;
