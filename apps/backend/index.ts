import express from 'express';
const app = express();
import { TrainModel, GenerateImage, GenerateImagesFromPrompt } from 'common/types';
import { prisma } from 'db';
import { S3Client, write, s3 } from 'bun';
import { FalAiModel } from 'models/FalAiModal';
import cors from 'cors'

app.use(cors({
    origin: "*"
}))

app.use(express.json());

const falAIModel = new FalAiModel();

app.post('/ai/training', async(req, res) => {
    const parseBody = TrainModel.safeParse(req.body);
    if(!parseBody.success){
        res.status(411).json({
            message: 'Please Pass the valid inputs'
        });
        return;
    }

    const {request_id, response_url} = await falAIModel.TrainModel(parseBody.data.zipUrl, parseBody.data.name)

    const data = await prisma.model.create({
        data:{
            name: parseBody.data.name,
            type: parseBody.data.type,
            age: parseBody.data.age,
            ethinicity: parseBody.data.ethinicity,
            eyeColor: parseBody.data.eyecolor,
            Bald: parseBody.data.bald,
            userId: "123",
            FalAiRequestId: request_id,
            zipUrl: parseBody.data.zipUrl,
            status: "Generated"
        }
    })

    res.json({
        message: 'Training data saved successfully',
        data: data
    });
});

app.post('/ai/generate', async(req, res) => {
    const parseBody = GenerateImage.safeParse(req.body);
    if(!parseBody.success){
        res.status(411).json({
            message: 'Please Pass the valid inputs'
        });
        return;
    }

    const model = await prisma.model.findUnique({
        where:{
            id: parseBody.data.modelId
        }
    })

    if(!model || !model.tensorPath){
        res.status(404).json({
            message: 'Model not found'
        });
        return;
    }

    const {request_id, response_url} = await falAIModel.generateImage(parseBody.data.prompt, model?.tensorPath) 

    const data = await prisma.outputImage.create({
        data:{
            prompt: parseBody.data.prompt,
            userId: "123",
            imageUrl: "",
            modelId: parseBody.data.modelId,
            falAiRequestId: request_id
        }
    })

    res.json({
        message: 'Image generated successfully',
        data: data.imageUrl
    });
});

app.post('/pack/generate', async(req, res)=>{
    const parseBody = GenerateImagesFromPrompt.safeParse(req.body);
    if(!parseBody.success){
        res.status(411).json({
            message: 'Please Pass the valid inputs'
        });
        return;
    }

    const prompts = await prisma.packPrompt.findMany({
        where:{
            packId: parseBody.data.packId
        }
    })

    prompts.forEach(async (prompt)=>{
        const {request_id, response_url} = await falAIModel.generateImage(prompt.prompt, parseBody.data.modelId) 

        
    })

    let requestIds: {request_id: string}[] = []

    await Promise.all(prompts.map((prompt)=>{
        falAIModel.generateImage(prompt.prompt, parseBody.data.modelId)
    }))

    const images = await prisma.outputImage.createManyAndReturn({
        data: prompts.map(prompt => ({
            prompt: prompt.prompt,
            userId: "123",
            imageUrl: "",
            modelId: parseBody.data.modelId
        }))
    })

    res.json({
        message: 'Images generated successfully',
        data: images.map(image => image.imageUrl)
    });
   

})

app.post('/fal-ai/webhook/train', async (req, res) => {
   const requestId = req.body.request_id;

   await prisma.model.updateMany({
    where:{
        FalAiRequestId: requestId
    }, data:{
        status: "Generated",
        tensorPath: req.body.tensor_path
    }
   })
})

app.post('/fal-ai/webhook/image', async (req, res) => {
   const requestId = req.body.request_id;
   const imageId = req.body.image_id;

   await prisma.outputImage.updateMany({
    where:{
        falAiRequestId: requestId
    }, data:{
        status: "Generated",
        imageUrl: req.body.image_url
    }
   })
})

app.get('/pack/bulk', async(req, res)=>{
    const packs = await prisma.packs.findMany({

    })

    res.json({
        packs
    })
});

app.get('/image/bulk', (req, res)=>{
    const image = req.query.images as string[];
    const limit = req.query.limit as string;
    const offset = req.query.offset as string;
    const images = prisma.outputImage.findMany({
        where:{
            id: {in: image},
            userId: "123"
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    });
    res.json({
        images: images

    })
})

app.get("/pre-signed-url", async(req, res)=>{
    const key = `models/${Date.now()}_${Math.random()}.zip`;
    const url = S3Client.presign("key.zip", {
        method: "PUT",
        bucket: process.env.BUCKET_NAME,
        expiresIn: 60*5,
        accessKeyId: process.env.S3_ACCESS_KEY,
        endpoint: process.env.ENDPOINT,
        secretAccessKey: process.env.S3_SECRET_KEY,
        type: "application/zip"
    })

    res.json({
        url,
        key
    })
})

app.listen(8080, ()=>{
    console.log("server is running on the port 8080")
});
