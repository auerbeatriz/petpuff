import { Request, Response } from 'express'

export const SampleController = (req: Request, res: Response) => {
    res
    .status(200)
    .json({
        success: 'true',
        message: 'Seja bem-vinde a PetPuff',
        version: '1.0.0'
     })
}