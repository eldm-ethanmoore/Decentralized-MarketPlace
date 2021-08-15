// Test verification with incorrect proof
// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
let SquareVerifier = artifacts.require('SquareVerifier');
// Test verification with correct proof
let proof = require('../../zokrates/code/square/proof.json');
// - use the contents from proof.json generated from zokrates steps
contract('TestSquareVerifier', accounts => {

    let account_one = accounts[0];

    describe('Test verification with correct proof', function () {
        beforeEach(async function () 
        {
            try 
            {
                this.contract = await SquareVerifier.new({ from: account_one });
            }
            catch (err) 
            {
                console.log(err);
            }
        });

        it('verification with correct proof', async function () 
        {
            let result = await this.contract.verifyTx.call
            (
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                { from: account_one }
            );
            assert.equal(result, true, "Unexpected result");
        });

        // Test verification with incorrect proof
        it('Test verification with incorrect proof', async function () 
        {

            let inputs = [10, 2]
            let result = await this.contract.verifyTx.call(
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                inputs,
                { from: account_one }
            );

            assert.equal(result, false, "The proof isn't correct");

        });
    })
});
