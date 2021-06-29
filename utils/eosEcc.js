import {randomBytes} from 'react-native-randombytes';
import sha256 from 'sha256';
import bs58 from 'bs58';

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

//converts a private key byte array to the EOS Wallet Import Format
function bytesToWIF(bytes) {
  const keyHex = bytes.toString('hex');
  const keyAndVersion = '80' + keyHex;
  const firstSHA = sha256(hexToBytes(keyAndVersion));
  const secondSHA = sha256(hexToBytes(firstSHA));
  const checksum = secondSHA.toString().substr(0, 8);
  const keyWithChecksum = keyAndVersion + checksum;
  const keyWif = bs58.encode(hexToBytes(keyWithChecksum));
  return keyWif;
}

export function generatePrivateKey() {
  const privateKeyArr = randomBytes(32);
  const privateKeyWif = bytesToWIF(privateKeyArr);
  return privateKeyWif;
}
