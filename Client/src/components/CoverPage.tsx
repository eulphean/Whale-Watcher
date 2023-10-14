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
    const [value, setValue] = useState("01HCG9DM9TPF7KFPRV43W10RSY");
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
                        <option value="01HCG9DM9TPF7KFPRV43W10RSY">Azuki</option>
                        <option value="01HCG9VGFPXMS5FX9M7420Q2MJ">DeGod</option>
                        <option value="01HCG9MANW29W590JR4W5SHN63">Milady</option>
                        <option value="01HCG8FS60VK0DRW28324K7JC2">Doodles</option>
                        <option value="01HCG9GABVSKYCWQ9YBFTST2XQ">Moonbirds</option>
                        <option value="01HCG9XV3H52FNJRY18QK034V7">The Potatoz</option>
                        <option value="01HCG9W8QE5VZK5PE1ZEQSBAZF">The Captainz</option>
                        <option value="01HCG9P9N84K1ZJW35SXGDVP3W">Pudgy Penguins</option>
                        <option value="01HCG9J9D9DNGKY2TW6NHG81AR">Wrapped CryptoPunks</option>
                        <option value="01HCG9AF9S4E5ZDDQ2W3AJ2VAR">Bored Ape Yacht Club</option>
                        <option value="01HCG9KCFQ6G1ZB6ZCJYNBGGFE">Mutant Ape Yacht Club</option>
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