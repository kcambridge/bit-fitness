import {Api, JsonRpc, RpcError} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';
import {useCallback, useEffect, useState} from 'react';
import {getData, saveData} from '../utils/encryptedStorage';
import {generatePrivateKey} from '../utils/eosEcc';

const pkKey = 'BIT_FITNESS_PK';
const pkSavedKey = 'BIT_FITNESS_PK_SAVED';

function useEOS() {
  const [jsProvider, setJSProvider] = useState<JsSignatureProvider | null>(
    null
  );
  const [jsProviderLoaded, setJSProviderLoaded] = useState(false);
  const [pkLoaded, setPKLoaded] = useState(false);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [pkSaved, setPKSaved] = useState(false);

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
      const signatureProvider = new JsSignatureProvider(pKs);
      setJSProvider(signatureProvider);
      setJSProviderLoaded(true);
      return;
    }
  }, []);

  const onPrivateKeySaved = useCallback(async () => {
    await saveData(pkSavedKey, '1');
    setPKSaved(true);
    setPrivateKey(null);
  }, [pkSavedKey]);

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
    jsProviderLoaded,
    pkLoaded,
    pkSaved,
    privateKey,
    onPrivateKeySaved,
    createPrivateKey,
  };
}

export default useEOS;
