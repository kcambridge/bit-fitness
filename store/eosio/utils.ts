import Config from 'react-native-config';
import {
  EOSIO_ACCOUNT,
  PermissionTypes,
  Transaction,
  TransactionAuthorization,
  TransactionData,
  TransactionPermission,
} from './types';

export function getAccountCreationTransaction(
  accountName: string,
  publicKey: string
): Transaction {
  const transactionAuth: TransactionAuthorization = {
    actor: Config.BIT_FITNESS_EOS_ACC,
    permission: PermissionTypes.Active,
  };
  const transactionPermission: TransactionPermission = {
    threshold: 1,
    keys: [{key: publicKey, weight: 1}],
    accounts: [],
    waits: [],
  };
  const transactionData: TransactionData = {
    creator: Config.BIT_FITNESS_EOS_ACC,
    name: accountName,
    owner: transactionPermission,
    active: transactionPermission,
  };
  const createAccountTrans: Transaction = {
    account: EOSIO_ACCOUNT,
    name: accountName,
    authorization: [transactionAuth],
    data: transactionData,
  };
  return createAccountTrans;
}
