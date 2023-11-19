const express = require("express"); 
const router = express.Router();

const {getAllItems,getItem,PostNewItem}= require("../controllers/Item");

router.post("/getitems",getAllItems); 
router.post("/getitem",getItem);
router.post("/additem",PostNewItem);

module.exports = router;
