import { request } from "express";
import { Connection, Request } from "tedious";

const config = {
  server: 'musicappsqlserver.database.windows.net',
  authentication: {
    type: 'default',
    options: {
      userName: 'ParthBMW@6789',
      password: 'your_password' 
    }
  }
}

const connection = new Connection(config)

