import axios from 'axios';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

function getUniqueHolders(data: any) {
  // Extract all holders from the array
  const holders = data.map((item: any) => item.holderAddress);

  // Filter the holders array to only contain unique holders
  // const uniqueHolders = [...new Set(holders)] as string[];

  return holders;
}

export default function Home() {
  // example contract
  const ethAddress = '0x5af0d9827e0c53e4799bb226655a1de152a425a5';
  const [data, setData] = useState<any>();
  const [uniqueHolders, setUniqueHolders] = useState<string[]>();

  useEffect(() => {
    const asyncReqs = async () => {
      try {
        //https://docs.amberdata.io/reference/get-token-holders
        const startDate = "2021-08-25T20%3A00%3A00.511Z";
        const endDate = "2021-09-26T20%3A00%3A00.511Z";
        //startDate=${startDate}&endDate=${endDate}`;
        const timeFrame = "30d";
        const link = `https://web3api.io/api/v2/tokens/${ethAddress}/holders/latest`
        const params = `?page=0&size=50&timeFrame=${timeFrame}&holderAddresses=${ethAddress}`
        const response = (await axios.post('/api/read', { link, params })).data;
        const holders = getUniqueHolders(response.payload.records);
        setUniqueHolders(holders);
        setData(response.payload.records);
        
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

      } catch {
        console.log('please provide a private key in .env.local');
      }
    }
    asyncReqs();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} overflow-scroll`}
    >
      <h1 className="text-4xl font-bold">Visualizer App</h1>
      <pre className="overflow-y-scroll h-screen pb-20 border-2 border-black">
        <h2 className="text-black font-bold text-4xl text-center my-8 border-b-2 border-black">TOP HOLDERS</h2>
        <code>
          {uniqueHolders?.map((holder) => <div>{holder}</div>)}
        </code>
        <h2 className="text-black font-bold text-4xl text-center my-8 border-b-2 border-black">WHALES</h2>
        <code className="">
          {data ? JSON.stringify(data, null, 2) : ""}
        </code>
      </pre>
    </main>
  )
}
