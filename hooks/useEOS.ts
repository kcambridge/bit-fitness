import {Api, JsonRpc} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';
import {useCallback, useEffect, useState} from 'react';
import {getData, saveData} from '../utils/encryptedStorage';
import {generatePrivateKey} from '../utils/eosEcc';
import {TransactionAuthorization} from '../store/eosio/types';
import {getAccountCreationTransaction} from '../store/eosio/utils';
import {EnvVars} from '../utils/appEnv';

const pkKey = 'BIT_FITNESS_PK';
const pkSavedKey = 'BIT_FITNESS_PK_SAVED';
const publicKeyKey = 'BIT_FITNESS_PUBLIC_KEY';
const eosAccountName = 'BIT_FITNESS_EOS_ACC_NAME';

function useEOS() {
  const [jsProvider, setJSProvider] = useState<JsSignatureProvider | null>(
    null
  );
  const [jsProviderLoaded, setJSProviderLoaded] = useState(false);
  const [pkLoaded, setPKLoaded] = useState(false);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [pkSaved, setPKSaved] = useState(false);
  const [rpc, setRPC] = useState<JsonRpc | null>(null);

  const loadPrivateKey = useCallback(async () => {
    const pkSavedLocal = await getData(pkSavedKey);
    if (pkSavedLocal && pkSavedLocal === '1') {
      setPKSaved(true);
    }
    const pk = await getData(pkKey);
    if (pk) {
      setPKLoaded(true);
      setPrivateKey(pk);
      return;
    }
  }, []);

  const createPrivateKey = useCallback(async () => {
    const pk = await getData(pkKey);
    const pkSavedLocal = await getData(pkSavedKey);
    if (pkSavedLocal && pkSavedLocal === '1') {
      setPKSaved(true);
    }
    if (pk) {
      setPKLoaded(true);
      setPrivateKey(pk);
      return;
    }

    //if the pk has already been saved, don't overrite it
    if (pkSavedLocal && pkSavedLocal === '1') return;

    const newPk: string = generatePrivateKey();
    const pkSaveResult = await saveData(pkKey, newPk);
    if (!pkSaveResult) {
      setPKLoaded(true);
      setPrivateKey(newPk);
      return;
    }
  }, []);

  const loadJSProvider = useCallback(async (storageKey: string) => {
    const pk = await getData(storageKey);
    if (pk) {
      const pKs = [pk];
      console.log('DEBUG MSG: privateKey', pk);
      const signatureProvider = new JsSignatureProvider(pKs);
      const availableKeys = await signatureProvider.getAvailableKeys();
      console.log('DEBUG MSG: availableKeys: ', availableKeys);

      console.log('DEBUG MSG: eosNetHost: ', EnvVars.EOSNETHOST);
      setJSProvider(signatureProvider);
      const newRPC = new JsonRpc(EnvVars.EOSNETHOST);
      setRPC(newRPC);
      setJSProviderLoaded(true);
      const block = await newRPC.get_block(1);
      console.log('DEBUG MSG: block: ', block);
      return;
    }
  }, []);

  const onPrivateKeySaved = useCallback(async () => {
    await saveData(pkSavedKey, '1');
    setPKSaved(true);
    setPrivateKey(null);
  }, [pkSavedKey]);

  const createAccount = useCallback(async () => {
    //const transaction = getAccountCreationTransaction()
  }, []);

  useEffect(() => {
    if (!pkLoaded) {
      loadPrivateKey();
    }
  }, [pkLoaded, loadPrivateKey]);

  useEffect(() => {
    if (pkLoaded && pkSaved && !jsProviderLoaded) {
      loadJSProvider(pkKey);
    }
  }, [pkLoaded, pkSaved, jsProviderLoaded, loadJSProvider]);

  return {
    jsProvider,
    rpc,
    jsProviderLoaded,
    pkLoaded,
    pkSaved,
    privateKey,
    onPrivateKeySaved,
    createPrivateKey,
  };
}

export default useEOS;
