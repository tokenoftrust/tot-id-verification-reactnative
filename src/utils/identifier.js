// src/utils/identifier.js
import * as Crypto from 'expo-crypto';

export const generateUniqueIdentifier = async (email) => {
    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, email.trim().toLowerCase());
    return hash;
};

