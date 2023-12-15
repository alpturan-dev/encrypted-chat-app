import forge from 'node-forge';

export const decryptWithRSA = (privateKey, encryptedText) => {
    // console.log("privateKey", privateKey)
    const rsa = forge.pki.privateKeyFromPem(privateKey);

    // Convert the base64-encoded encrypted text back to bytes
    const encryptedBytes = forge.util.decode64(encryptedText);

    // Decrypt the encrypted message using RSA-OAEP padding and SHA-256 hashing
    const md = forge.md.sha256.create();
    rsa.decryptOptions = {
        oaepHash: 'sha256',
        mgf1Hash: 'sha256',
    };
    const decryptedBytes = rsa.decrypt(encryptedBytes, 'RSA-OAEP', {
        md,
    });

    // Convert the decrypted bytes to a UTF-8 encoded string
    const decryptedText = forge.util.decodeUtf8(decryptedBytes);

    return decryptedText;
}





