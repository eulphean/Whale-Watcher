/*
    Author: Amay Kataria
    Date: 09/17/2023
    Description: A global redux like store to cross-share app data.
*/

import { create } from 'zustand'

const useGlobalStore = create(() => {
    return {
        topHolders: '',
        inputEthAddress: '',
        numRandomAgents: 0 // If this is 0, we are not doing this.
    }    
});

export default useGlobalStore;