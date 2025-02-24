import express from "express";
import dotenv from "dotenv"
import prisma from "db";
import { TrainModel, GenerateImage, GenerateImageFromPrompt} from "types"

dotenv.config()

const USER_ID = "1234asd"

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json())

app.post("/image/training", async(req, res)=> {

    const parseBody = TrainModel.safeParse(req.body)

    if (!parseBody.success){
        res.status(411).json({
            message : "Invalid Input"
        })
        return 
    }

    const train = await prisma.model.create({
        data: {
            name: parseBody.data.name,
            types: parseBody.data.types,
            age: parseBody.data.age,
            ethenicity: parseBody.data.ethenicity,
            bald: parseBody.data.bald,
            eyecolor: parseBody.data.eyecolor,
            userId: USER_ID
        }
    })

    res.json({
        modelId : train.id
    })

})


app.post("/image/generate", async(req,res)=>{

   const parseBody = GenerateImage.safeParse(req.body)
   if(!parseBody.success){
       res.status(411).json({
           message: "Invalid Input"
       })
       return
   }

   const data = await prisma.outputImage.create({
       data: {
            prompt: parseBody.data.prompt,
            modelId: parseBody.data.modelId,
            userId: USER_ID,
            imageurl: ""

       }
   })

   res.json({
       imageId: data.id
   })
    
})

app.post("/image/pack", async(req,res)=>{

    const bodyParse = GenerateImageFromPrompt.safeParse(req.body)

    if (!bodyParse.success){
        res.status(411).json({
            message: "Invalid Input"
        })
        return
    }

    const prompts = await prisma.packprompt.findMany({
        where:{
            packId: bodyParse.data.packId
        }
    })

    const images = await prisma.outputImage.createManyAndReturn({
        data:prompts.map((prompt)=>({
            prompt: prompt.prompt,
            userId: USER_ID,
            modelId : bodyParse.data.modeId,
            imageurl : ""
        }))
    })


    res.json({
        imageId : images
    })


    
})

app.get("/pack/bulk", async(req,res)=>{

    const packs = await prisma.packs.findMany({})
    res.json({
        packs
    })
})

app.get("/images/bluk", async(req,res)=>{
    const img = req.query.img as string[]
    const offset = req.query.offset as string || "0"
    const limit = req.query.limit as string || "10"
    const pics = await prisma.outputImage.findMany({
        where:{
            userId:USER_ID,
            id: { in:img }
        },
        skip: parseInt(offset),
        take : parseInt(limit)
    })

    res.json({
        images : pics 
    })

})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

