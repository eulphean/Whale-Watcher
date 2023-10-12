import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";


const API_KEY = process.env.API_KEY;

const headers = {
    headers: {
        "Content-Type": 'application/json',
        'x-dune-api-key': API_KEY
    }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const {url} = req.body;
    const response = (await axios.get(
      `${url}`,
      headers
    )).data;
    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
