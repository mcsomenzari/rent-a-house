import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';
import path from 'path';
import upload from './config/upload.js';

class App{

  constructor(){
    this.server = express();
    
    mongoose.connect('mongodb+srv://mcsomenzari:CYICE70MhfHBozi7@cluster0.3jsjc.mongodb.net/devhouse?retryWrites=true&w=majority&appName=Cluster0');

    this.middlewares();
    this.routes();
  }

  middlewares(){

    this.server.use(
      '/files',
      express.static(path.resolve('uploads'))
      
    );

    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server;
