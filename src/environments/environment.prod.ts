import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  production: true,
  apiUrl: process.env['BACK_URL'],
};
