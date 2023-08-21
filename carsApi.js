let express=require("express");
let app=express();
let bodyparser=require("body-parser");
app.use(bodyparser.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
});
var port= process.env.PORT || 2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
let {cars,carMaster}=require("./carsData.js");
app.get("/carmaster",function(req,res){
    res.send(carMaster);
    });
    

app.get("/cars",function(req,res){
    let minprice=req.query.minprice;
    let maxprice=req.query.maxprice;
    let fuel=req.query.fuel;
    let type=req.query.type;
    let sort=req.query.sort;
    
let arr=cars;
    if(minprice){
        arr=arr.filter((n)=>n.price>=minprice);
    }
    if(maxprice){
        arr=arr.filter((n)=>n.price<=maxprice);
    }
    if(fuel){
        arr = cars.filter(n => {
         model= carMaster.find(m => m.model === n.model);
        return model && model.fuel === fuel;
    });
    }
    if(type){
        arr = cars.filter(n => {
            model= carMaster.find(m => m.model === n.model);
           return model && model.type === type;
       });
    }
   
    if(sort==="kms"){
        arr.sort((a,b)=>a.kms-b.kms);
    }
    if(sort==="price"){
        arr.sort((a,b)=>a.price-b.price);
    }
    if(sort==="year"){
        arr.sort((a,b)=>a.year-b.year);
    }
    res.send(arr);
    });
    
     app.post("/cars",function(req,res){
                    let body=req.body;
                    console.log(body);
                    let newCar={...body};
                                cars.push(newCar);
                                res.send(newCar);
                                
                });
                app.get("/cars/:id",function(req,res){
    let id=req.params.id;
    let car=cars.find((n)=>n.id===id);
                    res.send(car);
                    });
                                

                app.put("/cars/:id",function(req,res){
                    let id=req.params.id;
                    let car=req.body;
                    console.log(id);
                    let index=cars.findIndex((n)=>n.id===id);
                    console.log(index);
                    if(index>=0){
                        let updated={id:id,...car};
                        cars[index]=updated;
                        console.log(updated);
                        res.send(updated);
                    }
                    else res.status(404).send("Not found");
                })

                app.delete("/cars/:id",function(req,res){
                    let id=req.params.id;
                    let index=cars.findIndex((n)=>n.id===id);
                    let car=cars.splice(index,1);
                    res.send(car);
                })