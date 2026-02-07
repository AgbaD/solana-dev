import wallet from "./wallet/turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/8qCrnrZh4WZQbFyV4hK9oGonAHEgAkzCT6P1H3qnKdMH";
        const metadata = {
            name: "OkiCat",
            symbol: "OKC",
            description: "I should maybe get a cat",
            image,
            attributes: [
                { trait_type: "Species", value: "Cat" },
                { trait_type: "Mood", value: "Oki" }
            ],
            properties: {
                files: [
                    {
                        type: "image/jpeg",
                        uri: image
                    },
                ],
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// Metadata URI:  https://gateway.irys.xyz/HWkC2Hw2MGUpg1yyjA91y2D3TtdLiYWkK2ABA3Ra42aU