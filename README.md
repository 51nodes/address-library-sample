# Address-Library-Sample

The AddrArrayLib Library provides utility functions to work with address[] types

### Version
    Truffle v5.1.41 (core: 5.1.41)
    Solidity v0.6.2 (solc-js)
    Node v12.14.0
    Web3.js v1.2.1
    Ganache v2.5.4

### Setup
* Download Ganache https://github.com/trufflesuite/ganache/releases
    * Set Ganache NETWORK ID 5777
    * Set Ganache Port Number 8545

* Alternative using docker https://hub.docker.com/r/trufflesuite/ganache-cli/
    * docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -a 10

* From the commandline run:
  * `npm install -g truffle`
  * `npm install`

### Run
* Open Ganache from Desktop.
* To compile the TokenContract and libraries run: `truffle compile`
* To Deploy the TokenContract run: `truffle migrate --reset`

### Test
* Open Ganache from Desktop.
* To Test the library with the provided TokenContract run: `truffle test`