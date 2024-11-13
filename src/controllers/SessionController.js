//Metodos: index, show, update, store, destroy
/*
index: Listagem de sessoes
store: Criar uma sessao
show: Quando queremos listar uma UNICA sessão
update: Quando queremos alterar alguma sessão
destroy: Quando queremos deletar uma sessão

*/

import User from "../models/User.js";
import * as Yup from 'yup';

class SessionController{

  async store(req, res){
    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { email } = req.body;

    console.log(req.body);

    let user = await User.findOne({ email });

    if(!user){
      user = await User.create({ email });
    }    

    return res.json(user);
  }

}

export default new SessionController();