const TokenContract = artifacts.require("TokenContract");

contract('TokenContract', (accounts) => {

  const owner = accounts[0];
  let tokenContractInsatnce;

  it('should deploy the smart contrat and check total supply', async () => {
    tokenContractInsatnce = await TokenContract.deployed();

    let initTotalSupply = (await tokenContractInsatnce.getTotalSupply.call()).toNumber();
    assert.equal(initTotalSupply, 100, "the init total supply was not 100");
  });

  it('should check that at the beginning the list of trusted minters is empty', async () => {

    let numberOfTrustedMinters = (await tokenContractInsatnce.getNumberOfMinters.call()).toNumber();
    assert.equal(numberOfTrustedMinters, 0, "the trusted minters array is not empty");
  });

  it('should add 3 addresses as minters to the first TokenContract', async () => {

    await tokenContractInsatnce.addMinterToTrustedList(accounts[1], {from: owner});
    await tokenContractInsatnce.addMinterToTrustedList(accounts[2], {from: owner});
    await tokenContractInsatnce.addMinterToTrustedList(accounts[3], {from: owner});

    let numberOfTrustedMinters = (await tokenContractInsatnce.getNumberOfMinters.call()).toNumber();
    assert.equal(numberOfTrustedMinters, 3, "the trusted minters array has more/less than 3 Minters");

    let addressOfFirstElementInList = await tokenContractInsatnce.getMinterAtIndex.call(0);
    assert.equal(addressOfFirstElementInList, accounts[1], "the address of the first element in list is not correct");

    let addressOfSecondElementInList = await tokenContractInsatnce.getMinterAtIndex.call(1);
    assert.equal(addressOfSecondElementInList, accounts[2], "the address of the second element in list is not correct");

    let addressOfThirdElementInList =  await tokenContractInsatnce.getMinterAtIndex.call(2);
    assert.equal(addressOfThirdElementInList, accounts[3], "the address of the third element in list is not correct");
  });

  it('should remove the second minter from array', async () => {

    let isTrustedMinterBeforeRemove = await tokenContractInsatnce.isAddressListedAsMinter.call(accounts[2]);
    assert.equal(isTrustedMinterBeforeRemove, true, "the address is not a minter");

    await tokenContractInsatnce.removeMinterFromTrustedList(accounts[2], {from: owner});

    let numberOfTrustedMinters = (await tokenContractInsatnce.getNumberOfMinters.call()).toNumber();
    assert.equal(numberOfTrustedMinters, 2, "the trusted minters array has more/less than 2 Minters");

       let addressOfFirstElementInList = await tokenContractInsatnce.getMinterAtIndex.call(0);
    assert.equal(addressOfFirstElementInList, accounts[1], "the address of the first element in list is not correct");

    let addressOfSecondElementInList = await tokenContractInsatnce.getMinterAtIndex.call(1);
    assert.equal(addressOfSecondElementInList, accounts[3], "the address of the second element in list is not correct");

    let isTrustedMinterAfterRemove = await tokenContractInsatnce.isAddressListedAsMinter.call(accounts[2]);
    assert.equal(isTrustedMinterAfterRemove, false, "the address is a minter");
  });

});
