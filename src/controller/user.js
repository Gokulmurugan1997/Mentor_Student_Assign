import mongodb,{MongoClient} from 'mongodb'
import env from '../config/env.js'


const client = new MongoClient(env.DB_URL)
const getMentor = async(req,res)=>{
    await client.connect()
    try {
        const db = await client.db(env.DB_name)
        let user= await db.collection('mentors').find().toArray()
        res.status(201).send({
            message:"fetched successfully",
            user})
    } catch (error) {
        res.status(400).send({
            message:"error"
        })
    }
}
const getStudent = async(req,res)=>{
    await client.connect()
    try {
        const db = await client.db(env.DB_name)
        let user= await db.collection('students').find().toArray()
        res.status(201).send({
            message:"fetched successfully",
            user})
    } catch (error) {
        res.status(400).send({
            message:"error"
        })
    }
}
const getStudentbyID = async(req,res)=>{
    await client.connect()
    try {
        const db = await client.db(env.DB_name)
        let user= await db.collection('students').findOne({_id:new mongodb.ObjectId(req.params.id)})
        res.status(201).send({
            message:"fetched successfully",
            user
        })
    } catch (error) {
        res.status(400).send({
            message:"error"
        })
    }
}
const createMentor = async(req,res)=>{
await client.connect()
try {
    const db = await client.db(env.DB_name)
    let user= await db.collection('mentors').findOne({email:req.body.email})
    if(!user){
        await db.collection('mentors').insertOne(req.body)
        res.status(201).send({
            message:"mentors created successfully"
        })
    }
    else{
        res.status(201).send({
            message:"user already exist"
        })
    }
    
} catch (error) {
    res.status(500).send({
        message:error.message || "Internal server error"
    })
}
finally{
    client.close()
}
}
const createStudent = async (req,res)=>{
    
        await client.connect()
        try {
            const db = await client.db(env.DB_name)
            let user1= await db.collection('students').findOne({name:req.body.name})
            if(!user1){
                await db.collection('students').insertOne(req.body)
                res.status(201).send({
                    message:"students created successfully"
                })
            }
            else{
                res.status(201).send({
                    message:"student already exist"
                })
            }
            
        } catch (error) {
            res.status(500).send({
                message:error.message ||"Internal server error"
            })
        }
        finally{
            client.close()
        }
        
}
const assignMentor = async (req,res)=>{
    
    await client.connect()
    try {
        const db = await client.db(env.DB_name)
        let user= await db.collection('students').findOne({_id:new mongodb.ObjectId(req.params.id)})
        if(user){
           await db.collection('students').updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:{mentor:req.body}})
            res.status(201).send({
            message:"mentor updated",
            user
        })}
        else{
            res.status(400).send({
                message:"Invalid id"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message ||"Internal server error"
        })
    }
    finally{
        client.close()
    }
    
}
const assignStudent = async (req,res)=>{
    
    await client.connect()
    try {
        const db = await client.db(env.DB_name)
        let user= await db.collection('mentors').findOne({_id:new mongodb.ObjectId(req.params.id)})
        if(user){
           await db.collection('mentors').updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:{student:req.body}})
            res.status(201).send({
            message:"Student updated",
            user
        })}
        else{
            res.status(400).send({
                message:"Invalid id"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message ||"Internal server error"
        })
    }
    finally{
        client.close()
    }
    
}

export default {
    getMentor,
    getStudent,
    getStudentbyID,
    createMentor,
    createStudent,
    assignMentor,
    assignStudent
 
}