import { Schema, model } from 'mongoose'

const guitarSchema = new Schema(
    {
        guitarMake: {
            type: String,
            required: true
        },
        guitarModel: {
            type: String,
            required: true
        },
        guitarType: {
            type: String,
            required: true
        },
        guitarPrice: {
            type: Number,
            required: true
        },
        guitarImage: {
            type: String
        }
    }
)
export default model('Guitars', guitarSchema);