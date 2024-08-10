// file: ./App.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {useCameraPermissions} from 'expo-camera';
import WebViewComponent from './src/components/WebViewComponent';
import EmailSelectionModal from './src/components/EmailSelectionModal';
import {generateUniqueIdentifier} from './src/utils/identifier';
import {fetchVerificationUrl} from './src/utils/api';

const storeEmailRecords = async (emailRecords) => {
    try {
        const promises = emailRecords.map((record, index) => {
            const recordKey = `email_record_${index}`;
            const recordValue = JSON.stringify(record);
            return SecureStore.setItemAsync(recordKey, recordValue);
        });

        // Store the count of records separately
        promises.push(SecureStore.setItemAsync('email_record_count', emailRecords.length.toString()));

        await Promise.all(promises);
    } catch (error) {
        console.error('Error storing email records:', error);
    }
};

const getEmailRecords = async () => {
    try {
        const recordCount = parseInt(await SecureStore.getItemAsync('email_record_count')) || 0;
        const promises = [];

        for (let i = 0; i < recordCount; i++) {
            const recordKey = `email_record_${i}`;
            promises.push(SecureStore.getItemAsync(recordKey));
        }

        const recordValues = await Promise.all(promises);
        return recordValues
            .filter(record => record !== null)
            .map(record => JSON.parse(record));
    } catch (error) {
        console.error('Error retrieving email records:', error);
        return [];
    }
};

const App = () => {
    const [webViewUrl, setWebViewUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [showWebView, setShowWebView] = useState(false);
    const [emailRecords, setEmailRecords] = useState([]);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        const initializeApp = async () => {
            const storedEmailRecords = await getEmailRecords();
            if (storedEmailRecords.length > 0) {
                setEmailRecords(storedEmailRecords);
                setModalVisible(true);
                } else {
                setModalVisible(true); // Show modal to enter email if none is stored
            }
        };

        if (!permission) {
            return;
        }

        if (!permission.granted) {
            console.log('Permissions not granted. Requesting permissions...');
            requestPermission().then((status) => {
                if (status.granted) {
                    initializeApp();
                } else {
                    Alert.alert('Permission Required', 'Camera permission is required to use this feature.');
                }
            }).catch((error) => {
                console.error('Error requesting camera permissions:', error);
            });
        } else {
            console.log('Permissions already granted.');
            initializeApp();
        }
    }, [permission]);

    const isUrlValid = (timestamp) => {
        if (timestamp) {
            const currentTime = new Date().getTime();
            const urlTime = new Date(parseInt(timestamp)).getTime();
            const timeDifference = currentTime - urlTime;
            const hoursDifference = timeDifference / (1000 * 3600);
            return hoursDifference < 24;
        }
    };

    const startVerification = async (userEmail) => {
        try {
            const identifier = await generateUniqueIdentifier(userEmail);
            const url = await fetchVerificationUrl(identifier, userEmail);
            if (url) {
                setWebViewUrl(url);
                const updatedRecords = [
                    { email: userEmail, url, timestamp: new Date().getTime() },
                    ...emailRecords.filter(record => record.email !== userEmail)
                ].slice(0, 3);
                setEmailRecords(updatedRecords);
                await storeEmailRecords(updatedRecords);
            }
                setShowWebView(true);
                setModalVisible(false);
        } catch (error) {
            console.error('Error in startVerification:', error);
        }
    };

    const handleEmailSubmit = async (userEmail) => {
        const existingRecord = emailRecords.find(record => record.email === userEmail);
        if (existingRecord && isUrlValid(existingRecord.timestamp)) {
            setWebViewUrl(existingRecord.url);
            setShowWebView(true);
            setModalVisible(false);
        } else {
        await startVerification(userEmail);
        }
    };

    return (
        <View style={styles.container}>
        {showWebView ? (
                <WebViewComponent
                    webViewUrl={webViewUrl}
                    handleFileUpload={() => console.log('File uploaded')}
                />
        ) : (
                <EmailSelectionModal
                    visible={modalVisible}
                    emailRecords={emailRecords}
                    onSubmit={handleEmailSubmit}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
