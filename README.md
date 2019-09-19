# Address-Library-Sample

The AddrArrayLib Library provides utility functions to work with address[] types

### Version
    Truffle v5.0.10 (core: 5.0.10)
    Solidity v0.5.0 (solc-js)
    Node v8.11.3
    Web3.js v1.0.0-beta.37
    Ganache v2.1.0

### Setup
* Download Ganache https://github.com/trufflesuite/ganache/releases/v2.1.0
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