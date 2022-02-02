// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Contacts {
    uint256 public count = 0;
    address owner;
    constructor() public {
        owner = msg.sender;
        createContact("Furkan Ozbek", "99999999");
    }

    struct Contact {
        uint256 id;
        string name;
        string phone;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    mapping(uint256 => Contact) public contactList;

    

    function createContact(string memory _name, string memory _phone) public {
        count++;

        contactList[count] = Contact(count, _name, _phone);
    }

    function deleteContact(uint256 contactId) public onlyOwner{
        delete contactList[contactId];
    }
}
