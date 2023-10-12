import axios from "axios";

/*
    Author: Amay Kataria
    Date: 10/12/2023
    Description: A controller that communicates with the Dune API to read the data
    for the NFT holders
*/
class DuneController {
    constructor() {
        console.log('New Controller');
    }

    async getData(executeId) {
        try {
            const url = `https://api.dune.com/api/v1/execution/${executeId}/results`;
            const response = await axios.post('/api/read', {url});
            const result = response.data['result']['rows'];
            console.log(result);
        } catch(event) {
            console.log('Something seriously went wrong in here. ');
            console.log(event);
        }
    }
}

export default new DuneController();