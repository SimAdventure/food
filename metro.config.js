<<<<<<< HEAD
const { withNativeWind } = require('nativewind/metro');
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");
 
const config = getSentryExpoConfig(__dirname)
 
=======
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
>>>>>>> c4abd6f9a9d6ea1df3ccb037d3909d4fa852bb0d
module.exports = withNativeWind(config, { input: './app/global.css' })