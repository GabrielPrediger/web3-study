import { ethers } from 'ethers';
import React, { useCallback } from 'react';
import './App.css';
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers';

declare var window: any

export interface AbstractConnectorArguments {
  supportedChainIds?: number[]
}

export const injectedProvider = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

function App() {
  const handleConnect = async (connector: any) => {
    // read-only
    let ethersProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_API_ENDPOINT);
    console.log(process.env.REACT_APP_API_ENDPOINT)
    let { provider } = await connector.activate(injectedProvider);
    console.log(provider)

    // signer
    const signer = provider.getSigner();
    ethersProvider = new Web3Provider(signer);
}
  

  // const connectWallet = useCallback(async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  //   // Prompt user for account connections 
  //   await provider.send("eth_requestAccounts", []); 
  //   const signer = provider.getSigner(); 
  //   console.log("Account:", await signer.getAddress());
  // }, [])

  // async function connect() {
  //   // Connect web3
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const accounts = await provider.listAccounts();
  //   console.log(accounts[0]);

  //   provider.request({ method: 'eth_requestAccounts' });


  //   //Balance
  //   const address = accounts[0];
  //   const balance = await provider.getBalance(address);
  //   console.log(`The ${address} balance: ${balance.toString()}`);
  // }

  return (
    <div className="App">
        <button onClick={handleConnect}>Connect</button>
    </div>
  );
}

export default App;
