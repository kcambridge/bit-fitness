# About

Bit Fitness is an EOS based blockchain fitness app, that rewards users for running with EOS

# Setup

## Install React Native

To run this application you will need React Native and either Android Studio or XCode installed. Follow the instructions below.

[https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

## Running the App Locally

1. Install npm and yarn
2. In the root directory run `npm install` in the terminal to install the required dependenencies
3. Run `yarn add @react-native-google-signin/google-signin` to install the React Native Google Sign-In library
4. Download the `google-services.json` file from the firebase console and place in the `./android/app`directory
5. Obtain the `Web Client ID` from the firebase console and add it to `AuthProvider.tsx`
6. Next run `npx react-native start` to start the Metro Server
7. Make sure the physical device or emulator is connected and running
8. Open a separate terminal window and run `npx react-native run-android` to run the application.
