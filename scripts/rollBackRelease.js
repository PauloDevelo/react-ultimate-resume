const Deployer = require('ssh-deploy-release');
const options = require('./deployOptions');

const deployer = new Deployer(options);
deployer.rollbackToPreviousRelease(() => {
    console.log('Ok !');
});
