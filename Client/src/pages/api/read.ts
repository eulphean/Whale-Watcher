import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";


const API_KEY = process.env.API_KEY;

const headers = {
    headers: {
        accept: 'application/json',
        'x-amberdata-blockchain-id': 'ethereum-mainnet',
        'x-api-key': API_KEY
    }
};
  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { link, params } = req.body;
    const response = (await axios.get(
      `${link}${params}`,
      headers
    )).data;
    console.log(response)
    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
