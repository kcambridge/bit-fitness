import EncryptedStorage from 'react-native-encrypted-storage';

export async function getData(key: string): Promise<string | null> {
  try {
    const result = await EncryptedStorage.getItem(key);
    if (result !== undefined) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function saveData(
  key: string,
  data: string
): Promise<string | null> {
  try {
    await EncryptedStorage.setItem(key, data);
    return null;
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  }
}
