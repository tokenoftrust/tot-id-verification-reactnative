// src/components/WebViewComponent.js
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

const WebViewComponent = ({ webViewUrl, handleFileUpload }) => {
    const webviewRef = useRef(null);

    const onFileUpload = (event) => {
        if (Platform.OS === 'android') {
            ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            }).then((result) => {
                if (!result.cancelled) {
                    console.log('Image picked: ', result.uri);
                    handleFileUpload(result.uri);
                }
            }).catch((error) => {
                console.error('Error launching camera:', error);
            });
        }
    };

    return (
        <WebView
            ref={webviewRef}
            source={{ uri: webViewUrl }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
            onMessage={onFileUpload}
            onPermissionRequest={(event) => {
                if (event.origin.includes('.tokenoftrust.com')) {
                    event.grant();
                }
            }}
        />
    );
};

export default WebViewComponent;

