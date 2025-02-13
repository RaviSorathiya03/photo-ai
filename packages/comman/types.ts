import {string, z} from 'zod';

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(['Man', 'Women', 'Other']),
    age: z.number(),
    ethinicity: z.enum([
        'White',
        'Black', 
        'Brown', 
        'Asian American', 
        'East Asian', 
        'South East Asian', 
        'Middle Eastern', 
        'Pacific', 
        'Hispanic'
    ]),
    eyecolor: z.enum(['Brown', 'Black', 'Hazel', 'Blue', 'Gray']),
    bald: z.boolean(),
    images: z.array(z.string()),
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string()
})

export const GenerateImagesFromPrompt = z.object({
    modelId: z.string(),
    packId: z.string(),
})