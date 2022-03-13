import { connector } from "../../public/script/script.js";

const indexController = {};

indexController.index = (req,res) => {

    connector.query("SELECT * FROM products_catalog", (err, response) =>{
        if(err) throw err;
        req.session.carrito = []
        
        res.render('productos', {products: response});
    })
    

}

indexController.addCarrito = (req,res) =>{
    let carrito = req.session.carrito;
    const precio = req.body.price;
    const product_name = req.body.product_name;
    const desc = req.body.desc;

    const query = "SELECT ID FROM products_catalog WHERE Price = ? AND Name = ? AND Description = ?";

    connector.query(query,[precio,product_name,desc], (err, response) =>{
        if (err) throw err;

        if(response.length > 0){
            if(carrito.length == 0){

                carrito.push({
                    nombre: product_name,
                    precio: precio,
                    desc: desc,
                    cantidad: 1
                });
    
                res.send("agregado");
    
            }else{
            
                let i = 0;
                carrito.forEach(element => {
                    
                   if(element.nombre == product_name){
                        i++;
                        element.cantidad = Number(element.cantidad) + 1;
                    }
                });
        
                if(i == 0){
                    carrito.push({
                        nombre: product_name,
                        precio: precio,
                        desc: desc,
                        cantidad: 1
                    });
                    res.send("agregado");
    
                }else{
                    res.send("sumado");            
                }    
                   
            }
        }
      
           
    })

}

indexController.carrito = (req,res) =>{
    let carrito = req.session.carrito;
    if( carrito.length == 0 || carrito == undefined){
        res.render('carrito', {vacio: true});
    }else{
        res.render('carrito', {vacio: false, carrito: carrito});
    }
}

export { indexController };