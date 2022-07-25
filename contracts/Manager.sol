//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Manager{
    
    struct Ticket{
        uint8 status;
        string name;
    }

    Ticket[] public tickets;
    
    function createTicket(string memory _name) external{
        tickets.push(Ticket(0,_name));
    }

    function updateTicket(uint _index,string memory _newName) external{
        tickets[_index].name = _newName;
    }

    function updateStatus(uint _index,uint8 _status) external{
        tickets[_index].status = _status;
    }

    function getTickets() view external returns(Ticket[] memory){
        return tickets;
    }

}