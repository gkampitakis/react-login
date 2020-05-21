import Server from './src';
import configuration from './configuration';

Server.start(configuration.port)
    .then(() => console.log(`Server running on port ${configuration.port}`))
    .catch((err) => console.log(err));