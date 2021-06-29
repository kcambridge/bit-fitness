/*import {randomBytes} from 'react-native-randombytes';
import sha256 from 'sha256';
import bs58 from 'bs58';
const ecurve = require('ecurve');
const Point = ecurve.Point;
const secp256k1 = ecurve.getCurveByName('secp256k1');
const BigInteger = require('bigi');
const sec = require('secp256k1');
import {public_key_from_private} from 'eos-ecc';
//const ecc = require('eosjs-ecc');
//const {get_public_key} = require('isomorphic-secp256k1');
//import {public_key_from_private} from 'eos-ecc';
//import secp256k1 from 'secp256k1';

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function bytesToWIF(bytes) {
  const keyHex = bytes.toString('hex');
  console.log('private key hex: ', keyHex);
  const keyAndVersion = '80' + keyHex;
  const firstSHA = sha256(hexToBytes(keyAndVersion));
  const secondSHA = sha256(hexToBytes(firstSHA));
  const checksum = secondSHA.toString().substr(0, 8);
  const keyWithChecksum = keyAndVersion + checksum;
  const keyWif = bs58.encode(hexToBytes(keyWithChecksum));
  return keyWif;
}

export function generateKeys() {
  const privateKeyArr = randomBytes(32);
  console.log('DEBUG MSG: privKeyBytes: ', privateKeyArr);
  const privateKeyWif = bytesToWIF(privateKeyArr);
  console.log('DEBUG MSG: privateKey: ', privateKeyWif);

  const pubKeyBytesUnit8 = sec.publicKeyCreate(privateKeyArr);
  var pubKeyBytes = randomBytes(32);
  for (var i = 0; i < pubKeyBytesUnit8.length; ++i) {
    pubKeyBytes[i] = pubKeyBytesUnit8[i];
  }
  console.log('DEBUG MSG: pubKeyBytes: ', pubKeyBytes);

  const pubKeyHex = '04' + pubKeyBytes.toString('hex');
  console.log('DEBUG MSG: pubKeyHex: ', pubKeyHex);
  const publicKeyWif = bytesToWIF(pubKeyBytes);
  console.log('DEBUG MSG: publicKeyWif: ', publicKeyWif);

  const privateKeyBN = BigInteger.fromByteArrayUnsigned(privateKeyArr);
  console.log('DEBUG MSG: privateKeyBN: ', privateKeyBN);
  var curvePt = secp256k1.G.multiply(privateKeyBN);
  console.log('DEBUG MSG: curvePt: ', curvePt);
}

/*const ecurve = require('ecurve');
const Point = ecurve.Point;
const secp256k1 = ecurve.getCurveByName('secp256k1');
const BigInteger = require('bigi');
export function generateKeys() {}*/

/*const pubKeyBytesUnit8 = secp256k1.publicKeyCreate(privateKeyArr);
  var pubKeyBytes = randomBytes(32);
  for (var i = 0; i < pubKeyBytesUnit8.length; ++i) {
    pubKeyBytes[i] = pubKeyBytesUnit8[i];
  }
  console.log('DEBUG MSG: pubKeyBytes: ', pubKeyBytes);
  const pubKeyHex = pubKeyBytes.toString('hex');
  console.log('DEBUG MSG: pubKeyHex: ', pubKeyHex);
  const publicKeyWif = bytesToWIF(pubKeyBytes);
  console.log('DEBUG MSG: publicKeyWif: ', publicKeyWif);*/

//const libPub = get_public_key({privateKeyArr});
//console.log('DEBUG MSG: libPub: ', libPub);*/
