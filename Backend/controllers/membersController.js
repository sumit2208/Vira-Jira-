const Members = require("../models/members")

const createMembers = async (req,res)=>{
    try{
        const NewMember = new Members(req.body);
        await NewMember.save();
        res.status(201).json(NewMember)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}



module.exports={createMembers}