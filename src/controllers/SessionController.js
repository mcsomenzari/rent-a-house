//Metodos: index, show, update, store, destroy
/*
index: Listagem de sessoes
store: Criar uma sessao
show: Quando queremos listar uma UNICA sessão
update: Quando queremos alterar alguma sessão
destroy: Quando queremos deletar uma sessão

*/

import User from "../models/User.js";

class SessionController{

  async store(req, res){
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