import express from 'express';
import { createApp } from './src/server/index.js';

const app: express.Express = createApp();

export default app;

