import express from 'express';
const app = express();
import { TrainModel, GenerateImage, GenerateImagesFromPrompt } from 'common/types';
app.post('/ai/training', (req, res) => {

});

app.post('/ai/generate', (req, res) => {

});

app.post('/pack/generate', (req, res)=>{

})

app.get('/pack/generate', (req, res)=>{

});

app.get('/image', (req, res)=>{

})

app.listen(8080, ()=>{
    console.log("server is running on the port 8080")
});
