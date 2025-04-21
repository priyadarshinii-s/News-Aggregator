import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from './contractAbi';

const contractABI = abi;
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


const ContractContext = createContext(null);


export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);


  useEffect(() => {
    const init = async () => {
      try {
        const web3Provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
        setProvider(web3Provider);

        const signer = await web3Provider.getSigner();
        setSigner(signer);

        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };

    init();
  }, []);

  const contextValue = {
    contract,
    provider,
    signer,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};