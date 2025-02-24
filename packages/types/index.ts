import z from "zod";

export const TrainModel = z.object({
    name :z.string(),
    types:z.enum(["Man", "Women", "Others"]),
    age: z.number(),
    ethenicity: z.enum(["Asian","White","Black", "Hspanic"]),
    eyecolor: z.enum(["Brown","Black","Green","Blue"]),
    bald: z.boolean(),
    images: z.array(z.string())

})


export const GenerateImage = z.object({
    prompt: z.string(),
    modelId:z.string(),
    num:z.number()
})

export const GenerateImageFromPrompt = z.object({
    modeId: z.string(),
    packId: z.string()
})