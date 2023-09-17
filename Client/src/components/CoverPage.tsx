/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Cover page for the MVP
*/
import axios from 'axios';
import { Inter } from 'next/font/google';
import { useState } from "react"
import useGlobalStore from "./stores/useGlobalStore";

const styles = {
    title: {
        fontSize: '100px',
        fontWeight: 'bold'
    },

    input: {
        borderStyle: 'solid',
        borderColor: 'black ',
        width: '350px'
    },

    button: {
        marginLeft: '20px',
        borderStyle: 'solid',
        borderColor: 'black'
    },

    contractContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px'
    }
}

const defaultEthAddress = "0x5af0d9827e0c53e4799bb226655a1de152a425a5";
const defaultNumAgents = 200;

function getUniqueHolders(data: any) {
    // Extract all holders from the array
    const holders = data.map((item: any) => item.holderAddress);

    // Filter the holders array to only contain unique holders
    // const uniqueHolders = [...new Set(holders)] as string[];

    return holders;
}
  
export default function CoverPage (props) {
    const [address, setAddress] = useState(defaultEthAddress);
    const [numAgents, setNumAgents] = useState(defaultNumAgents);

    const handleChange = (event) => {
        const v = event.target.value;
        setAddress(v);
    }

    const handleChangeNumber = (event) => {
        const v = event.target.value; 
        setNumAgents(parseInt(v));
    }

    const startContractExperience = (event) => {
        const asyncReqs = async () => {
            try {
                //https://docs.amberdata.io/reference/get-token-holders
                const startDate = "2021-08-25T20%3A00%3A00.511Z";
                const endDate = "2021-09-26T20%3A00%3A00.511Z";
                //startDate=${startDate}&endDate=${endDate}`;
                const timeFrame = "30d";
                const link = `https://web3api.io/api/v2/tokens/${address}/holders/latest`
                const params = `?page=0&size=100&timeFrame=${timeFrame}&holderAddresses=${address}`
                const response = (await axios.post('/api/read', { link, params })).data;
                // const holders = getUniqueHolders(response.payload.records);
                useGlobalStore.setState({ topHolders: response.payload.records});
                
                /* QUERY OBJECT EXAMPLE
                {
                    "tokenAddress": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
                    "holderAddress": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
                    "timestamp": 1694921207000,
                    "holderFirstTimestamp": "2023-05-01T18:20:47.000Z",
                    "numTokens": "459",
                    "decimals": "0"
                }
                */
        
            } catch (event) {
                console.log(event);
                console.log('please provide a private key in .env.local');
            }
        }
        asyncReqs();

        // Wait a tiny bit before loading this jazz.
        setTimeout(props.onShowExperience, 2000);
    }

    const startRandomExperience = (event) => {
        // Set a number of agents here.
        console.log(numAgents);
        useGlobalStore.setState({ numRandomAgents: numAgents });
        
        // Wait a tiny bit before loading this jazz.
        setTimeout(props.onShowExperience, 2000);
    }

    return <>
        <div style={styles.title}>Whale Watcher</div>
        <div style={styles.contractContainer}>
            <input onChange={handleChange} value={address} type="text" autoFocus style={styles.input} />
            <button onClick={startContractExperience} style={styles.button}>Contract Setup</button>
        </div>
        <div style={styles.contractContainer}>
            <input onChange={handleChangeNumber} value={numAgents} type="number" autoFocus style={styles.input} />
            <button style={styles.button} onClick={startRandomExperience}>Random Setup</button>
        </div>
    </>
}