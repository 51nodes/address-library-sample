const TokenContract = artifacts.require("TokenContract");

module.exports = function(deployer) {
  deployer.deploy(TokenContract);
};
