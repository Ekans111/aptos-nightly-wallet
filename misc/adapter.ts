import { NightlyConnectAptosAdapter } from '@nightlylabs/wallet-selector-aptos'

let _adapter: NightlyConnectAptosAdapter | undefined
// @ts-ignore
export const getAdapter = async (persisted = true) => {
  console.log("getAdapter_1===>", _adapter)
  if (_adapter) return _adapter
  _adapter = await NightlyConnectAptosAdapter.build({
    appMetadata: {
      name: 'Aptos Template',
      description: 'Aptos Template',
      icon: 'https://docs.nightly.app/img/logo.png',
    },
  })
  console.log("getAdapter_2===>", _adapter)
  return _adapter
}