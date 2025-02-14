import * as  z  from 'zod';
import { TrainModel, GenerateImage, GenerateImagesFromPrompt } from './types';

export type TrainModelInput = z.infer<typeof TrainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPromptInput = z.infer<typeof GenerateImagesFromPrompt>;
