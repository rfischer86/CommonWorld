import * as env from './environment';

const envProd = env.environment;
envProd.production = true;

export const environment = envProd;
