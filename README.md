<h1 align="center">
  Encrypted Chat App
</h1>
This README contains web-based chat content that is separated for encrypted communication purposes. The aim of the project is to enable users to communicate in a secure and encrypted way.

## Introduce

- [Algorithm Used: RSA](#algorithm-used-rsa)
- [Application Flow](#application-flow)
- [Security precautions](#security-precautions)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Goals
• To enable users to message safely.

• Performs message encryption and decryption using RSA distribution.

## Algorithm Used: RSA

### What is the RSA Algorithm?
RSA is a public key encryption process when performing encryption and decryption operations. The structural assembly of the prime is durable and works with public and private key pairs.


### Working Logic of the RSA Algorithm

• Encryption is done with the public key (public key) by multiplying the prime limit.

• Messages encrypted with this public key (public key) can only be decrypted with the private key (private key).
 
### Using RSA Inside the Application
• A public and private key (public and private key) are generated for the user.

• Public key (public key) is used to encrypt messages.

• Private key (private key) is used to decrypt encrypted solutions.

## Application Flow

### Login Method

• Users log in to the application with Google identity protection.

• Then they select the room that wants to join.

### Key Creation and Management
• During login processes for users, public and private keys (public and private key) are generated for each of them.

• Public keys are available in the Firebase repository along with the room name and username.

• Private keys are stored locally at the user's location, depending on the session. It is never sent to any other environment.

### Encrypted Messaging

• Users send encrypted messages within the room.

• Messages to be sent are encrypted using the recipient's public key.

• Encrypted messages sent to the Firebase store.

• Recipients can decrypt messages using their own private keys.

## Security precautions

### Key Security

• Users' private keys are kept only in the local SessionStorage and are not transmitted to the server.

• Only encrypted messages are sent to the Firebase store,
clear text messages are not stored.


## Usage
Make sure you have the necessary tools and environment set up for React development.

### Install

```bash
Clone this repository with `git clone https://github.com/alpturan-dev/encrypted-chat-app.git`
Navigate to the project directory with `cd encrypted-chat-appp`
```

### Setup

```bash
Install packages with `npm install`
```

### Start

```bash
Run `npm run dev` to start project.
```

## Technologies Used

### React.js

• Used to operate the user interface.

### Firebase

• Used for session management and data storage purposes.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.


## License

This project is licensed under the [MIT License](LICENSE)
