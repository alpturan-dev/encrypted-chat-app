import forge from 'node-forge'

export const encryptWithRSA = (publicKey, plaintext) => {
    const rsa = forge.pki.publicKeyFromPem(publicKey);
    const encryptedText = rsa.encrypt(plaintext, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encryptedText);
}