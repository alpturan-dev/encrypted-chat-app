import forge from 'node-forge'

export const keyGenerator = () => {
    // Create an RSA key pair
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

    // Get the public key in PEM format
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

    // Get the private key in PEM format (encrypted with a passphrase)
    const passphrase = 'your_passphrase_here'; // Change this to your desired passphrase
    const privateKeyPem = forge.pki.encryptRsaPrivateKey(keyPair.privateKey, passphrase);

    const keys = { publicKey: publicKeyPem, privateKey: privateKeyPem };
    return keys;
}