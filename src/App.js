import { ethers } from 'ethers';
import Manager from './artifacts/contracts/Manager.sol/Manager.json';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    let res = await contract.getTickets();
    // console.log(res);
    setTickets(res);
  };
  const updateTicket = async (_index, _status) => {
    const transaction = await contract.updateStatus(_index, _status);
    await transaction.wait();
    getTickets();
  };
  const renameTicket = async (_index) => {
    let newName = prompt('Please Enter a new name : ', '');
    const transaction = await contract.updateTicket(_index, newName);
    await transaction.wait();
    getTickets();
  };
  const createTicket = async (_name) => {
    let res = await contract.createTicket(_name);
    await res.wait();
    getTickets();
  };

  const initConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner();
      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          '0xc6a644cf5452f45c07d91612f152A8aF283063b9',
          Manager.abi,
          newSigner
        )
      );
    } else console.log('please install metamask');
  };

  useEffect(() => {
    initConnection();
  }, []);

  // console.log(contract);

  return (
    <div className='page'>
      <div className='header'>
        <p>Task Manager</p>
        {account !== '' ? (
          <p>{account.substring(0, 9)}</p>
        ) : (
          <button className='big-button' onClick={initConnection}>
            connect
          </button>
        )}
      </div>
      <div className='input_section'>
        <div>
          <button className='big_button' onClick={() => createTicket(name)}>
            Create Ticket
          </button>
          <input
            type='text'
            className='input'
            onChange={(e) => setName(e.target.value)}
            placeholder='ticket Name'
          />
        </div>
        <button className='big_button' onClick={getTickets}>
          Load Data
        </button>
      </div>
      <div className='main'>
        <div className='main-col' style={{ background: 'lightPink' }}>
          <div className='main-col-heading'>Todo</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 0)
            .map((ticket, i) => {
              return (
                <div key={i} className='main_ticket_card'>
                  <p className='main_ticket_card_id'>#{ticket.id}</p>
                  <p>{ticket.item.name}</p>
                  <div className='main_ticket_button_section '>
                    <button
                      style={{ backgroundColor: 'lightBlue' }}
                      className='small_button'
                      onClick={() => updateTicket(ticket.id, 1)}>
                      Busy
                    </button>
                    <button
                      style={{ backgroundColor: 'lightGreen' }}
                      className='small_button'
                      onClick={() => updateTicket(ticket.id, 2)}>
                      Done
                    </button>
                    <button
                      style={{ backgroundColor: 'lightGray' }}
                      className='small_button'
                      onClick={() => renameTicket(ticket.id)}>
                      Rename
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='main-col' style={{ background: 'Cyan' }}>
          <div className='main-col-heading'>Busy</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 1)
            .map((ticket, i) => {
              return (
                <div key={i} className='main_ticket_card'>
                  <p className='main_ticket_card_id'>#{ticket.id}</p>
                  <p>{ticket.item.name}</p>
                  <div className='main_ticket_button_section '>
                    <button
                      style={{ backgroundColor: 'lightPink' }}
                      className='small_button'
                      onClick={() => updateTicket(ticket.id, 0)}>
                      Todo
                    </button>
                    <button
                      style={{ backgroundColor: 'lightGreen' }}
                      className='small_button'
                      onClick={() => updateTicket(ticket.id, 2)}>
                      Done
                    </button>
                    <button
                      style={{ backgroundColor: 'lightGray' }}
                      className='small_button'
                      onClick={() => renameTicket(ticket.id)}>
                      Rename
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='main-col' style={{ background: 'lightBlue' }}>
          <div className='main-col-heading'>Done</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status === 2)
            .map((ticket, i) => {
              return (
                <div key={i} className='main_ticket_card'>
                  <p className='main_ticket_card_id'>#{ticket.id}</p>
                  <p>{ticket.item.name}</p>
                  <div className='main_ticket_button_section '>
                    <button
                      style={{ backgroundColor: 'lightPink' }}
                      className='small_button'
                      onClick={() => updateTicket(ticket.id, 0)}>
                      Todo
                    </button>
                    <button
                      style={{ backgroundColor: 'lightBlue' }}
                      className='small_button'
                      onClick={() => updateTicket(ticket.id, 1)}>
                      Busy
                    </button>
                    <button
                      style={{ backgroundColor: 'lightGray' }}
                      className='small_button'
                      onClick={() => renameTicket(ticket.id)}>
                      Rename
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
