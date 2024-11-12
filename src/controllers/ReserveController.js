import Reserve from '../models/Reserve.js';
import User from '../models/User.js';
import House from '../models/House.js';

class ReserveController{

  async index(req, res){
    const { user_id } = req.headers;
  }

  async store(req, res){
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    if(!house){
      return res.status(400).json({ error: 'Casa não existe.' });      
    }

    if(Boolean(house.status) !== true){
      return res.status(400).json({ error: 'Solicitação indisponível.'});
    }

    // Não permite dono da casa fazer reserva da própria casa
    const user = await User.findById(user_id);
    if (String(user._id) === String(house.user)){
      return res.status(401).json( { error: 'Reserva não permitida.' });

    }


    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    })

    const retorno  = await Reserve.findOne({ _id: reserve }).populate('house').populate('user').exec();

    //(await reserve.populate('house')).populate('user').execPopulate();

    return res.json(retorno);
  }

}

export default new ReserveController();