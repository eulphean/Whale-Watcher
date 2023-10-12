import { Headers } from 'node-fetch';
import fetch from 'node-fetch';

// Add the API key to an header object
const meta = {
    "x-dune-api-key": "2aja0Jrr3DYCbDcsLJ3mSj1ICMUjoVJs",
    "Content-Type": "application/json"
};
const header = new Headers(meta);



//  Call the Dune API

var params = { "query_parameters" : { "nft_collection": "The Potatoz" }};
var body = JSON.stringify(params);
const queryId = "3097849"; // NFT holders query ID
const query = `https://api.dune.com/api/v1/query/${queryId}/execute`;

const executeId = "01HCG9P9N84K1ZJW35SXGDVP3W" // Generated after each query
const execute = `https://api.dune.com/api/v1/execution/${executeId}/results`;

function executeQuery() {
    fetch(query, {
        method: 'POST',
        headers: header, 
        body: body
    }).then(response => {
        response.json().then(result => console.log(result))
    });
}

function retrieveResults() {
    fetch(execute, {
        method: 'GET',
        headers: header
    }).then(response => {
        response.json().then(result => {
            console.log(result['result']['rows'][0]['address']);
        });
    });
}

// executeQuery();
retrieveResults();