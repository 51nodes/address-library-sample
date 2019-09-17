/*

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity >= 0.4.25 < 0.6.0;

import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';
import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import './AddrArrayLib.sol';

contract TokenContract is Ownable {
    using AddrArrayLib for AddrArrayLib.Addresses;
    using SafeMath for uint256;

    // List of trusted addresses which can mint tokens
    AddrArrayLib.Addresses trustedMinters;

    uint256 private totalSupply;
    mapping (address => uint256) balances;

    constructor () public {
        totalSupply = 100;
        balances[msg.sender] = 100;
    }

    function mintToken(address to, uint256 amount) external {
        require(trustedMinters.exists((msg.sender), 'The sender address is not registered as a Minter');
        totalSupply = totalSupply.add(amount);
        balances[to] = balances[to].add(amount);
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    function removeMinterFromTrustedList(address minter) public onlyOwner() {
        trustedMinters.removeAddress(minter);
    }

    function addMinterToTrustedList(address minter) public onlyOwner() {
        trustedMinters.pushAddress(minter);
    }

    function listMinters() public view returns(address[] memory) {
        return trustedMinters.getAllAddresses();
    }

    function getMinterAtIndex(uint256 index) public view returns(address) {
        return trustedMinters.getAddressAtIndex(index);
    }

    function getNumberOfMinters() public view returns(uint256) {
        return trustedMinters.size();
    }

    function isAddressListedAsMinter(address minter) public view returns(bool) {
        return trustedMinters.exists(minter);
    }

}
