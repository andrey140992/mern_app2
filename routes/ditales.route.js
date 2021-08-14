const {Router} = require('express')
const router = new Router()
const auth = require('../middlewere/auth.middlewere')
const Ditales = require('../models/Ditales.js')


router.post(
    '/add',
    auth,
    async (req, res) => {

    try {

        const {name, surname, midname, city} = req.body
        
        const existing = await Ditales.findOne({/* name, surname, midname, city, */ owner: req.user.userId})//???????!!!!! было без овнера и фаинд ван
        
        if(existing){
            return res.json({ details: existing, message: 'Данные уже созданы!'})
        }
        
        const ditales = new Ditales({name, surname, midname, city, owner: req.user.userId})
        await ditales.save()

        res.status(201).json({ditales, message: 'Данные успешно созданы!'})

    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова 1'})
        
      }
})

router.put(
'/put',
 auth,
async (req, res) => {

try {
    
    const {name, surname, midname, city} = req.body
   
    const existing = await Ditales.findOne({owner: req.user.userId})
        
    if(!existing){
        return res.json({message: 'Данные еще не созданы!'})
    }

    const updatedDitales = await Ditales.findOneAndUpdate({owner: req.user.userId}, {name: name, surname: surname, midname: midname, city: city, owner: req.user.userId}, {new:true, useFindAndModify: false})
    

    res.status(201).json({updatedDitales, message:'Данные успешно обновлены!'})

}catch(e){
    console.log(e)
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова 1'})
    
  }
})

router.delete(
    '/delete',
     auth,
    async (req, res) => {
    
    try {
        
        
       
        const existing = await Ditales.findOne({owner: req.user.userId})
            
        if(!existing){
            return res.json({message: 'Данные еще не созданы!'})
        }
    
        const deletedDitales = await Ditales.findOneAndDelete({owner: req.user.userId})
        
    
        res.status(201).json({deletedDitales, message:'Данные успешно удалены!'})
    
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова 1'})
        
      }
    })

router.get('/:id', auth, async (req, res)=> {
    try {
        const ditales = await Ditales.findById(req.params.id)  ////было фаинд ван
        
        res.json({ditales, message:'Данные успешно Получены!'})
      
    }catch(e){
        
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова 3'})
      }
})

module.exports = router