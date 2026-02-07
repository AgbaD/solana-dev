import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "./wallet/turbin3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi, {
        mint,
        name: "OkiCat",
        symbol: "OKC",
        uri: "https://gateway.irys.xyz/HWkC2Hw2MGUpg1yyjA91y2D3TtdLiYWkK2ABA3Ra42aU",
        sellerFeeBasisPoints: percentAmount(0),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);

    console.log("Mint Address: ", mint.publicKey);
})();

// https://explorer.solana.com/tx/3TokjR5KeV9CqVV1Uy2HoVfDdRzUy9VuLcvn4mo1GMK1Z6F2zX5ekXEwAHjhg9FLvaEuMYzDaWdgcZR6gLxGNXqN?cluster=devnet
// Mint Address:  FQ1b5E6wRaG7My88fVGFbqpX2SHYzapEs39Sk7TF1Zng