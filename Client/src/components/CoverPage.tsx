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
    artists: {
        marginTop: '10px',
        fontSize: '16px',
        fontStyle: 'italic'
    },

    github: {
        marginTop: '8px',
        fontSize: '18px'
    },

    title: {
        marginTop: '220px',
        fontSize: '120px',
        fontWeight: '8',
        marginBottom: '20px',
        fontFamily: 'Brush Script MT'
    },

    subtitle: {
        fontSize: '30px',
        fontWeight: 'bold',
        marginBottom: '50px',
        fontFamily: 'monospace',
        textDecoration: 'underline'
    },

    titleSmall: {
        fontSize: '30px',
        fontWeight: '8',
        marginBottom: '100px',
        fontFamily: 'Brush Script MT'
    },

    input: {
        borderStyle: 'solid',
        borderColor: 'blue ',
        height: '50px',
        width: '350px',
        fontSize: '15px',
        fontColor: 'green',
        fontWeight: 'bold'
    },

    button: {
        marginLeft: '20px',
        borderStyle: 'solid',
        borderColor: 'blue',
        fontSize: '20px',
        height: '50px'
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
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
    const [hideUI, setHideUI] = useState(false);

    const handleChange = (event) => {
        const v = event.target.value;
        setAddress(v);
    }

    const handleChangeNumber = (event) => {
        const v = event.target.value; 
        setNumAgents(parseInt(v));
    }

    const startContractExperience = (event) => {
        setHideUI(true);

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

        setHideUI(true);
        
        // Wait a tiny bit before loading this jazz.
        setTimeout(props.onShowExperience, 1000);
    }

    const uiBlock = () => {
        return <>
            <div style={styles.actionContainer}>
                <div style={styles.infoContainer}>
                    <div>Contract Address</div>
                    <input onChange={handleChange} value={address} type="text" autoFocus style={styles.input} />
                </div>
                <button onClick={startContractExperience} style={styles.button}>GO</button>
            </div>
            <div style={styles.infoContainer}>
                <div>Squiggles (Art Blocks): 0x8d137e3337eb1b58a222fef2b2cc7c423903d9cf</div>
                <div>Fidenza (Art Blocks): 0x175eaf4feb0a147b5a77549389392094bf38b198</div>
                <div>Board Apes: 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d</div>
            </div>
            <div style={styles.actionContainer}>
                <div style={styles.infoContainer}>
                    <div>Random Whale Count</div>
                    <input onChange={handleChangeNumber} value={numAgents} type="number" autoFocus style={styles.input} />
                </div>
                <button style={styles.button} onClick={startRandomExperience}>GO</button>
            </div>
        </>
    }

    return <>
        <div style={styles.container}>   
            <div style={styles.title}>Whale Watcher</div>
            <div style={styles.subtitle}>ETHChicago2023</div>
            {hideUI ? <div style={styles.titleSmall}>Loading things up...</div> : uiBlock() }           
            <div style={styles.artists}>Amay Kataria / Max Knivets / Blair McKee</div>
            <a href={'https://github.com/eulphean/visualizer-hackathon-app'} target="_blank" style={styles.github}>Github</a>
        </div>
    </>
}