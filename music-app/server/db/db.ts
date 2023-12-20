import { createPool } from "mysql2/promise";

const config = createPool({
    host: '54.39.132.104',
    user: 'devparthp_musicappadmin',
    password: 'ParthBMW@6789ParthBMW@6789ParthBMW@6789ParthBMW@6789ParthBMW@6789',
    database: 'devparthp_musicApp',
    waitForConnections: true,
    connectionLimit: 10,
});

export default config;