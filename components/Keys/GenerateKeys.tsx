import React, {useCallback} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Logo from '../shared/Logo/Logo';
import ScreenShell from '../shared/ScreenShell';

interface KeyGenProps {
  pk: string | null;
  createKey: () => void;
  onFinish: () => void;
}
const KeyGeneration: React.FC<KeyGenProps> = ({pk, createKey, onFinish}) => {
  const copyToClipboard = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={300} height={150} />
      </View>
      <Text style={styles.header}>Generate Private Key</Text>
      <Text style={styles.descriptionLevel1}>
        Your private key is the key to retrieving your tokens, literally.
      </Text>
      <Text style={styles.descriptionLevel2}>
        Without it you will lose access to the tokens you earn, forever!!!
      </Text>
      <Text style={styles.descriptionLevel1}>
        Keep it safe and never share it with anyone
      </Text>
      <View style={styles.button}>
        <Button
          title={pk ? 'Re-generate Private Key' : 'Generate Private Key'}
          onPress={() => createKey()}
        />
      </View>
      {pk && (
        <View style={styles.pkContainer}>
          <View>
            <TextInput
              style={styles.pkHidden}
              value={pk}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.copyButton}>
            <Button onPress={() => copyToClipboard()} title="Copy" />
          </View>
          <View style={styles.finishedButton}>
            <Button onPress={() => onFinish()} title="Finished" color="red" />
          </View>
        </View>
      )}
    </View>
  );
};

interface Props {
  pk: string | null;
  createPrivateKey: () => void;
  onPrivateKeySaved: () => void;
}

const GenerateKeys: React.FC<Props> = ({
  pk,
  createPrivateKey,
  onPrivateKeySaved,
}) => {
  return (
    <ScreenShell>
      <KeyGeneration
        pk={pk}
        onFinish={onPrivateKeySaved}
        createKey={createPrivateKey}
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionLevel1: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionLevel2: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 60,
  },
  pkContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pk: {
    textAlign: 'center',
    fontSize: 20,
  },
  copyButton: {
    marginTop: 5,
    width: 100,
  },
  finishedButton: {
    marginTop: 40,
    width: 180,
    color: 'red',
  },
  pkHidden: {
    textAlign: 'center',
  },
});
export default GenerateKeys;
