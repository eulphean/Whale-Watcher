import axios from 'axios';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // example contract
  const ethAddress = '0x5af0d9827e0c53e4799bb226655a1de152a425a5';
  const [data, setData] = useState<any>();

  useEffect(() => {
    const asyncReqs = async () => {
      try {
      // https://docs.amberdata.io/reference/get-token-balances
      const startDate = "2021-08-24T20%3A00%3A00.511Z";
      const endDate = "2021-08-25T20%3A00%3A00.511Z";
      const params = `?startDate=${startDate}&endDate=${endDate}&tokenAddress=${ethAddress}&page=0&size=200`;
      const response = (await axios.post('/api/read', { ethAddress, params })).data;
      const sliced = response.payload.records.slice(0, 100);
      setData(sliced);

      /* QUERY OBJECT EXAMPLE
      {
        address: "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
        amount: "0",
        blockNumber: "13096482",
        decimals: "0",
        holder: "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
        isERC20: false,
        isERC721: true,
        isERC777: false,
        isERC884: false,
        isERC998: false,
        isERC1155: false,
        name: "Milady",
        symbol: "MIL",
        timestamp: "2021-08-25T19:48:48.000Z",
      }

      address: the originating mint address
      amount: tokenId (it's mostly incorrect)
      holder: current holder
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
        <code className="">
          {data ? JSON.stringify(data, null, 2) : ""}
        </code>
      </pre>
    </main>
  )
}
