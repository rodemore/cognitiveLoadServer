const { Router } = require('express');

const router = Router();



router.get("/", (req,res) => {
    res.json({"Title": "cognitive Load server"});
})




module.exports = router;