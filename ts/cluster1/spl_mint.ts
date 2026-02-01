

import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wallet/turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("F7FQpLCoGpb7BXXqutB1t8YdPzNpTmAx3QfBAykFCycT");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        )
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair,
            8444449
        )
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


// ata address = Da8HFUxVnaPBtkrj5nJPRBdmkHum3Pa2xDnZPkGpJ4RM
// mint txn id = 4pJ9yZ17VPkgyTa2KTC6CRg6oNqrFTKd78NkJHKDTjCY4J1o5SoX4FBhjeAfn7bfX5QkM28bJ67QAabUQejKpt7F


