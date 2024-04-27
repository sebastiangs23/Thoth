

export async function createUsers(req,res){
    try{
        let objeto = {
            nombre : 'Sebastian'
        };

        res.json(objeto);

    }catch(error){
        res.json({
            message:'Error en el controlador createUsers ' + error
        })
    }
}