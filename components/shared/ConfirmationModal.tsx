import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmationModal: React.FC<Props> = ({title, onConfirm, onCancel}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button onPress={onCancel} title="Cancel" />
        </View>
        <View style={styles.button}>
          <Button onPress={onConfirm} title="Confirm" />
        </View>
      </View>
    </View>
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
  title: {
    fontSize: 16,
    marginTop: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginRight: 10,
  },
});

export default ConfirmationModal;
