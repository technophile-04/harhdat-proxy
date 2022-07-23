// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

contract Box {
    /* Storage variables */
    uint256 internal s_vlaue;

    /* Events */
    event valueChanged(uint256 newValue);

    /* Public functions */
    function store(uint256 newValue) public {
        s_vlaue = newValue;
        emit valueChanged(newValue);
    }

    function retrive() public view returns (uint256) {
        return s_vlaue;
    }

    function version() public pure returns (uint256) {
        return 1;
    }
}
