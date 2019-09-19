const TokenContract = artifacts.require('TokenContract');
const { expectRevert } = require('openzeppelin-test-helpers');

contract('TokenContract', (accounts) => {

  const owner = accounts[0];
  let tokenContractInstance;

  it('should deploy the smart contract and set the correct initial total supply', async () => {
    tokenContractInstance = await TokenContract.deployed();

    let initTotalSupply = (await tokenContractInstance.getTotalSupply.call()).toNumber();
    assert.equal(initTotalSupply, 100, 'the init total supply was not 100');
  });

  it('should check that the number of trusted minters 0 at the beginning', async () => {

    let numberOfTrustedMinters = (await tokenContractInstance.getNumberOfMinters.call()).toNumber();
    assert.equal(numberOfTrustedMinters, 0, 'the trusted minters array is not empty');
  });

  it('should add 3 addresses as minters to the TokenContract', async () => {

    await tokenContractInstance.addMinterToTrustedList(accounts[1], { from: owner });
    await tokenContractInstance.addMinterToTrustedList(accounts[2], { from: owner });
    await tokenContractInstance.addMinterToTrustedList(accounts[3], { from: owner });

    let numberOfTrustedMinters = (await tokenContractInstance.getNumberOfMinters.call()).toNumber();
    assert.equal(numberOfTrustedMinters, 3, 'the trusted minters array has more/less than 3 minters ');

    let addressOfFirstElementInList = await tokenContractInstance.getMinterAtIndex.call(0);
    assert.equal(addressOfFirstElementInList, accounts[1], 'the address of the first element in list is not correct');

    let addressOfSecondElementInList = await tokenContractInstance.getMinterAtIndex.call(1);
    assert.equal(addressOfSecondElementInList, accounts[2], 'the address of the second element in list is not correct');

    let addressOfThirdElementInList = await tokenContractInstance.getMinterAtIndex.call(2);
    assert.equal(addressOfThirdElementInList, accounts[3], 'the address of the third element in list is not correct');
  });

  it('should revert cause there is no address at index 3', async () => {

    await expectRevert(
      tokenContractInstance.getMinterAtIndex.call(3), 'the index is out of bounds');

  });

  it('should remove the second minter from array', async () => {

    let isTrustedMinterBeforeRemove = await tokenContractInstance.isAddressListedAsMinter.call(accounts[2]);
    assert.equal(isTrustedMinterBeforeRemove, true, 'the address is not a minter');

    await tokenContractInstance.removeMinterFromTrustedList(accounts[2], { from: owner });

    let numberOfTrustedMinters = (await tokenContractInstance.getNumberOfMinters.call()).toNumber();
    assert.equal(numberOfTrustedMinters, 2, 'the trusted minters array has more/less than 2 minters ');

    let addressOfFirstElementInList = await tokenContractInstance.getMinterAtIndex.call(0);
    assert.equal(addressOfFirstElementInList, accounts[1], 'the address of the first element in list is not correct');

    let addressOfSecondElementInList = await tokenContractInstance.getMinterAtIndex.call(1);
    assert.equal(addressOfSecondElementInList, accounts[3], 'the address of the second element in list is not correct');

    let isTrustedMinterAfterRemove = await tokenContractInstance.isAddressListedAsMinter.call(accounts[2]);
    assert.equal(isTrustedMinterAfterRemove, false, 'the address is a minter');
  });

});
