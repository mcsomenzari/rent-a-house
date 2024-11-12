 //import path from 'path';
 //import { fileURLToPath } from 'url';

import House from '../models/House.js'
import User from '../models/User.js';



class HouseController {

  async index(req, res){
    const { status } = req.query;
    const houses = await House.find({ status });
    return res.json(houses);

  }

  async store(req, res){
    
    /*
    console.log(req.body);
    console.log('file', req.file);

     // Testes com caminhos de arquivos
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const dirname = path.resolve('..','uploads'); // get the name of the directory
    
    console.log(__filename);
    console.log(dirname);
    */
    
    //const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;    

    //TODO: Verificar se existe o arquivo da imagem ao realizar o post. Crash no sistema se estiver vazio.
    // O middleware preenche o fiel. Verificar o que acontece quando está vazio.
    const house = await House.create({
      user: user_id,
      thumbnail: req.file.filename,
      description,
      price,
      location,
      status
    });
    
    
    return res.json( house );
  }

  async update(req, res){
    //const { filename } = req.file;
    const { house_id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    console.log(String(user._id));
    console.log(houses.user);

    // Quando não encontra, o valor fica nulo (ocorre erro)
    if (String(user._id) !== String(houses.user)){
      return res.status(401).json({ error: 'Não autorizado.'});
    }
    
    //TODO: Verificar se existe o arquivo da imagem ao realizar o post. Crash no sistema se estiver vazio.
    const house = await House.updateOne({ _id: house_id }, {
      user: user_id,
      thumbnail: req.file.filename,
      description,
      price,
      location,
      status
    });

    return res.json( house );
  }

  async destroy(req, res){
    const { house_id } = req.body;
    const { user_id } = req.headers;

    console.log(house_id);

    const house = await House.deleteOne({ _id: house_id });

    return res.json(house);
  }

}

export default new HouseController();