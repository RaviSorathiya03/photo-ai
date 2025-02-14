import {string, z} from 'zod';

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(['Man', 'Women', 'Others']),
    age: z.number(),
    ethinicity: z.enum([
        'White',
        'Black',  
        'AsianAmerican', 
        'EastAsian', 
        'SouthEastAsian', 
        'MiddleEastern', 
        'Pacific', 
        'Hispanic'
    ]),
    eyecolor: z.enum(['Brown', 'Black', 'Hazel', 'Blue', 'Gray']),
    bald: z.boolean(),
    zipUrl: z.string(),
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string()
})

export const GenerateImagesFromPrompt = z.object({
    modelId: z.string(),
    packId: z.string(),
})