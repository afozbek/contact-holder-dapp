// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Contacts {
    uint256 public count = 0;

    struct Contact {
        uint256 id;
        string name;
        string phone;
    }

    mapping(uint256 => Contact) public contactList;

    constructor() public {
        createContact("Furkan Ozbek", "99999999");
    }

    function createContact(string memory _name, string memory _phone) public {
        count++;

        contactList[count] = Contact(count, _name, _phone);
    }
}
