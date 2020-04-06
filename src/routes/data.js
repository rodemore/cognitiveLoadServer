const { Router } = require('express');
let fs = require("fs");
const router = Router();


//console.log(pos)


router.get('/', (req,res) =>{
    res.json(pos)
});

router.post('/', (req, res) => {
    console.log(req.body);
    
    var dir = `Experimentos/${req.body["id"]}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    let index = 0

    var filename = "hola.json"

        
    var json = JSON.stringify(req.body["json_data"]);

    fs.writeFile(dir+"/"+filename, json, {}, () => {
    });
    
 
    fs.readdir("Experimentos/respaldo", function (err, archivos) {
        if (err) {
            console.log("ERROR")
            onError(err);
            return;
        }   
        index = archivos.length
        fs.writeFile(fi, json, {}, () => {
        });
    });



    });




module.exports = router;