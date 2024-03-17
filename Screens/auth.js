import AsyncStorage from "@react-native-async-storage/async-storage";

 export const LOGIN_URL = "https://b209-103-130-90-210.ngrok-free.app/model/login/";
 export const AUTH_URL = "https://b209-103-130-90-210.ngrok-free.app/model/login/";

export const saveTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getTokenFromStorage = async () => {
  try {
    const Token = await AsyncStorage.getItem("accessToken");
    return Token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};