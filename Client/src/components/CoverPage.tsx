/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Cover page for the MVP
*/
import { useState } from "react"
import useGlobalStore from "./stores/useGlobalStore";
import DuneController from "./controllers/DuneController";

function getUniqueHolders(data: any) {
    // Extract all holders from the array
    const holders = data.map((item: any) => item.holderAddress);

    return holders;
}
  
export default function CoverPage (props) {
    // Default value of the select box is Azuki - this is the value associated with it.
    const [value, setValue] = useState("01J1WGNKX7WG5QF1BMNZ1GK79J");
    const [showLoading, setShowLoading] = useState(false);

    const startContractExperience = async (event) => {
        // Show
        setShowLoading(true);
        const result = await DuneController.getData(value);
        useGlobalStore.setState({ topHolders: result });
        setTimeout(() => props.onShowExperience(), 2000);
    }

    const onItemSelected = (event) => {
        setValue(event.target.value);
    }

    return <>
        <div className={'h-screen flex flex-col items-center justify-center text-black'}>   
            <div className="text-6xl font-serif italic">Whale Watcher</div>  
            {showLoading ? <div>Loading things up...</div> : 
               <div className="flex flex-col items-center gap-2 mt-6">
                    <div className="text-md font-semibold">
                        NFT COLLECTION
                    </div>
                    <select className="w-40 h-10 border-gray-400 rounded shadow border-2 text-center"
                        onChange={onItemSelected}>
                        <option value="01J1WGNKX7WG5QF1BMNZ1GK79J">Azuki</option>
                        <option value="01J1WGQ34T040Z1JB0B5G60HJD">DeGods</option>
                        <option value="01J1WGT2Y2KHTHWXHBKMJGV18H">Milady</option>
                        <option value="01J1WGW3PV49S31MNHQMXHQ85R">Doodles</option>
                        <option value="01J1WGZKHQ8MYPTKEVBJVGZ589">Moonbirds</option>
                        <option value="01J1WH1NSNQH96PNNRT78Y3RE1">The Potatoz</option>
                        <option value="01J1WH3SV1QK0JM9DMZWCA4P2W">The Captainz</option>
                        <option value="01J1WH56JAE2J51J6WYP9VPQX4">Pudgy Penguins</option>
                        <option value="01J1WFWPAG2Z881P5923AT26F7">Wrapped CryptoPunks</option>
                        <option value="01J1WG7T9QYQKN1PM8MGKK004X">Bored Ape Yacht Club</option>
                        <option value="01J1WH78FBGQ6HJ3XRXK65KGMM">Mutant Ape Yacht Club</option>
                    </select> 
                    <button onClick={startContractExperience} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-1 py-1 px-4 border border-gray-400 rounded shadow">
                        GO
                    </button>
                </div>
            }  
            <div className="mt-3 flex flex-col items-center text-center">
                <div>Amay Kataria / Max Knivets / Blair McKee</div>    
                <div>Developed at ETHChicago 2023</div>
            </div>
        </div>
    </>
}

// {hideUI ? <div>Loading things up...</div> : uiBlock() }           
// <div>Amay Kataria / Max Knivets / Blair McKee</div>