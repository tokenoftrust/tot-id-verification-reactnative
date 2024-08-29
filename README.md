# Token of Trust WebView Integration

This project demonstrates how to integrate the [**Token of Trust**](https://www.tokenoftrust.com/) (ToT) **API** for **Identity Verification**, **Age Verification**, and **Photo ID Verification** within a [**React Native**](https://reactnative.dev/) application using a **WebView**. The app showcases how to implement a seamless verification process on both **Android** and **iOS** devices, making use of [**Expo**](https://expo.dev/) and **Expo GO** for easy deployment and testing.

## Project Overview

- **Purpose**: To provide a working example of how to embed the Token of Trust [**Verify Person API**](https://tot-public-documentation.s3.amazonaws.com/Verify+Person+API.pdf) into a mobile app using **React Native** and **Expo**.
- **Key Features**:
  - **Email Management**: Automatically manages and stores the last three email addresses used for verification, allowing users to select from these or enter a new email.
  - **WebView Integration**: Displays the Token of Trust verification process within a WebView, ensuring a smooth and secure user experience.
  - **Optimized Performance**: Uses **SecureStore** to save and retrieve email records and URLs, optimized to handle storage efficiently and reduce load times.

## Project Structure

- **App.js**: The main entry point of the application. It manages the state of the WebView, handles user interactions, and controls the display of the verification process.
- **src/**:
  - **components/**:
    - **EmailSelectionModal.js**: A component that allows users to select from the last three emails or enter a new one for verification.
    - **WebViewComponent.js**: A wrapper around the WebView that loads the Token of Trust verification URL.
  - **utils/**:
    - **api.js**: Contains functions to interact with the Token of Trust **RESTful API**.
    - **identifier.js**: Utility for generating unique identifiers based on user email.

## Setup Instructions

### Prerequisites

- **Node.js** and **npm/yarn** installed.
- **Expo CLI** installed globally (`npm install -g expo-cli`).
- A registered [**Token of Trust**](https://app.tokenoftrust.com/hq/register) account to obtain the necessary API keys. You can get a trial license.
- **Expo on iOS or Expo Go on Android** must be installed to recognize the QR code.
 
Note: The iOS simulator camera didn't work for us so we highly recommend that you use native devices but please do give us feedback in terms of what worked for you.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tokenoftrust/tot-id-verification-reactnative
   cd tot-id-verification-reactnative
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   
    - Copy `template.env.json` to `.env.json`.
    - Update `.env.json` with your [**Token of Trust API Keys**](https://app.tokenoftrust.com/hq/guides/integration) which you can find by checking the integrations tab within [Token of Trust HQ](https://app.tokenoftrust.com/hq):

```json
      {
       "APP_DOMAIN": "YOUR_APP_DOMAIN",
       "TOT_API_KEY": "public_YOUR_API_KEY",
       "TOT_SECRET_KEY": "secret_YOUR_SECRET"
      }
```

4. Start the development server:

Start it just as you would any other Expo app.

This should work:
   ```bash
   npm start
   ```

This should also work:
   ```bash
   npx expo start -c
   ```

4. The web version... not currently supported. 

Is not currently supported for two reasons:
1. React-native doesn't support webviews.
2. CORS limitations with our current API.

### Key Features

- **Email Management**: The app remembers the last three email addresses used for verification, along with their associated verification URLs and timestamps. It allows users to select one of these emails or enter a new one which is intended to help developers to move between new verifications and back to old ones to see how Token of Trust handles in progress verifications.
- **WebView Integration**: The verification process is displayed within a WebView, which supports both **Android** and **iOS** devices, ensuring that the verification process is accessible on multiple platforms.
- **Performance Optimization**: The app uses `Promise.all` to handle multiple asynchronous storage operations concurrently, improving load times and reducing the overall wait time.

### Troubleshooting

- **Camera not opening on iOS simulator**: This is a known issue. Try it on a native device.
- **WebView not loading**: Ensure that the correct API keys are set in `.env.json`. Verify that the WebView URL is correctly fetched from the Token of Trust API.
- **The app always loads the same user**: Shouldn't be a problem in this app but common for people to forget - if you're calling fetch with our APIs you shouldn't pass cookies. Call fetch with `credentials: 'omit'`.

### Contributing

Feel free to submit issues or pull requests if you find any bugs or have suggestions for new features. Contributions that improve the integration with **React**, **React Native**, and **Expo** are particularly welcome.

### Keywords

Token of Trust, API, RESTful, Expo, Expo GO, Android, iOS, React, React Native, Hello World, Example, Verify Person API, Age Verification, Identity Verification, Photo ID Verification
