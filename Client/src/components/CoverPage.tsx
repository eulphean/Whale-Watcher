/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: Cover page for the MVP
*/
import { useState } from "react";
import useGlobalStore from "./stores/useGlobalStore";
import DuneController from "./controllers/DuneController";

function getUniqueHolders(data: any) {
  // Extract all holders from the array
  const holders = data.map((item: any) => item.holderAddress);

  return holders;
}

export default function CoverPage(props) {
  // Default value of the select box is Azuki - this is the value associated with it.
  const [value, setValue] = useState("01KKYDMENP0X30JDN3NKN0NF6C");
  const [showLoading, setShowLoading] = useState(false);

  const startContractExperience = async (event) => {
    // Show
    setShowLoading(true);
    const result = await DuneController.getData(value);
    useGlobalStore.setState({ topHolders: result });
    setTimeout(() => props.onShowExperience(), 2000);
  };

  const onItemSelected = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div
        className={
          "h-screen flex flex-col items-center justify-center text-black"
        }
      >
        <div className="text-6xl font-serif italic">Whale Watcher</div>
        {showLoading ? (
          <div>Loading things up...</div>
        ) : (
          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="text-md font-semibold">NFT COLLECTION</div>
            <select
              className="w-40 h-10 border-gray-400 rounded shadow border-2 text-center"
              onChange={onItemSelected}
            >
              <option value="01KKYDMENP0X30JDN3NKN0NF6C">Azuki</option>
              <option value="01KKYE47DJD3DXV50PQR96E97Y">DeGods</option>
              <option value="01KKYE5758FNT9MA814JGCXDQP">Milady</option>
              <option value="01KKYE62BGRJZBGKNEG9HESPMS">Doodles</option>
              <option value="01KKYE71W7PSEADBQFCVSHS5P3">Moonbirds</option>
              <option value="01KKYE7VAPE2CYHAQY1B5QFH19">The Potatoz</option>
              <option value="01KKYE8P6TBXPH212SJ594P7HT">The Captainz</option>
              <option value="01KKYE9TBKCCG3A0CKV13N1F6P">Pudgy Penguins</option>
              <option value="01KKYEAT89F9N0Y5EJ2BGZ88G9">
                Wrapped CryptoPunks
              </option>
              <option value="01KKYEBP4R7N1873CENGMD1HR8">
                Bored Ape Yacht Club
              </option>
              <option value="01KKYEE597CX5XWJ8VDS0619JM">
                Mutant Ape Yacht Club
              </option>
            </select>
            <button
              onClick={startContractExperience}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-1 py-1 px-4 border border-gray-400 rounded shadow"
            >
              GO
            </button>
          </div>
        )}
        <div className="mt-3 flex flex-col items-center text-center">
          <div>Amay Kataria / Max Knivets / Blair McKee</div>
          <div>Developed at ETHChicago 2023</div>
        </div>
      </div>
    </>
  );
}

// {hideUI ? <div>Loading things up...</div> : uiBlock() }
// <div>Amay Kataria / Max Knivets / Blair McKee</div>
