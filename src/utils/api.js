// src/utils/api.js
import * as SecureStore from 'expo-secure-store';
import {Alert} from 'react-native';

import { APP_DOMAIN, TOT_API_KEY, TOT_SECRET_KEY } from '../../.env.json';

export const fetchVerificationUrl = async (uniqueIdentifier, email) => {
    console.log('Starting API call to fetch verification URL');

    let body = {
        appDomain: APP_DOMAIN,
        totApiKey: TOT_API_KEY,
        totSecretKey: TOT_SECRET_KEY,
        appUserid: uniqueIdentifier,
        traceId: uniqueIdentifier,
        person: {
            primaryEmail: email,
        }
    };

    let bodyAsString = JSON.stringify(body, null, 2);
    console.log('Calling api/person with body:', bodyAsString);

    try {
        const response = await fetch('https://test.tokenoftrust.com/api/person', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyAsString,
            credentials: 'omit' // Ensure cookies are never included
        });

        const responseText = await response.text();
        console.log('Raw Response:', responseText);

        try {
            const json = JSON.parse(responseText);
            console.log('API Response:', JSON.stringify(json, null, 2));

            if (json.content && json.content.continuation && json.content.continuation.params && json.content.continuation.params.url) {
                const url = json.content.continuation.params.url;
                console.log('Received continuation URL:', url);
                await SecureStore.setItemAsync('webview_url', url);
                console.log('URL stored securely');
                return url;
            } else {
                console.error('No continuation URL found in the response.');
                Alert.alert('Error', 'No continuation URL found in the response.');
                return null;
            }
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            Alert.alert('Error', 'Failed to parse JSON: ' + jsonError.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching verification URL:', error);
        Alert.alert('Error', 'Error fetching verification URL: ' + error.message);
        return null;
    }
};

