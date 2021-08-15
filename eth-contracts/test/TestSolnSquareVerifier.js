let SquareVerifier = artifacts.require('SquareVerifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let proof = require('../../zokrates/code/square/proof');

contract('TestSolnSquareVerifier', accounts => {

    let account_one = accounts[0]
    let account_two = accounts[1]

    beforeEach(async function () 
    {
        let squareVerifier = await SquareVerifier.new({ from: account_one })
        this.contract = await SolnSquareVerifier.new(SquareVerifier.address, {from: account_one})
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () 
    {

        let result = await this.contract.mintToken(account_two, 1,
            proof.proof.a,
            proof.proof.b,
            proof.proof.c,
            proof.inputs,
            { from: account_one }
        )
        assert.equal(result.logs[0].event, 'SolutionAdded', 'Failed to add a solution')
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () 
    {
        let isMint = true
        try 
        {
            await this.contract.mintToken(account_two, 1,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                { from: account_one }
            )
        } catch (e) {
            isMint = false
        }

        assert.equal(isMint, true, "cannot mint  a token");
    });
})