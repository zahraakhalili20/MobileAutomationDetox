const firstSetup = require('../config/envSetup.js');

describe('Setting up environment ', () => {
    it('Setting up tokens and settings', async () => {

        await firstSetup.setup()
    })
})