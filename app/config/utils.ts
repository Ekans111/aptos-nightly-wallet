
const OWNER_PRIVATE_KEY = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const FULLNODE_RPC = "https://aptos.testnet.porto.movementlabs.xyz/v1";

const Airdrop_Lock_Time = 60;

export {
    OWNER_PRIVATE_KEY,
    FULLNODE_RPC,
    Airdrop_Lock_Time,
}
