import guitarSchema from "../models/guitarSchema.js";
import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationFolder = path.resolve(__dirname, "../temp/");
      cb(null, destinationFolder); 
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, "guitarImage" + ext); 
    },
  });
  
  const upload = multer({ storage: storage });

export const create = async (req, res) => {
    try {
        const { guitarMake, guitarModel, guitarType, guitarPrice } = req.body;

        let guitarImage = ""

        if (req.file) {
            guitarImage = req.file.path
        }

        const newGuitar = new guitarSchema({
            guitarMake,
            guitarModel,
            guitarType,
            guitarPrice,
            guitarImage
        });

        const totalGuitars = await guitarSchema.countDocuments()
        const code = totalGuitars + 1;

        newGuitar.guitarCode = code;

        const savedGuitar = await newGuitar.save()

        res.status(201).json(savedGuitar)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getGuitars = async (req, res) => {
    try {
        const guitars = await guitarSchema.find();
        
        const guitarsWithImageUrl = guitars.map((guitar) => ({
            ...guitar._doc,
            guitarImage: `http://localhost:3000/${guitar.guitarImage}`,
        }));
        res.status(200).json(guitarsWithImageUrl)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        const guitar = await guitarSchema.findById(id);
        if (!guitar) {
            return res.status(404).json({message: 'Guitar not found'})
        }
        guitar.guitarImage = `http://localhost:3000/${guitar.guitarImage}`
        res.status(200).json(guitar)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const patchGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        const { guitarPrice } = req.body;
        const updatedGuitar = await guitarSchema.findByIdAndUpdate(
            id,
            { $set: { guitarPrice }},
            { new: true }
        );

        if (!updatedGuitar) {
            return res.status(404).json({message: 'Guitar not found'})
        }
        res.status(200).json(updatedGuitar)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getGuitarByName = async (req, res) => {
    try {
        const { guitarModel } = req.query;
        const regex = new RegExp(guitarModel, 'i')

        let filteredGuitars = await guitarSchema.find({ guitarModel: regex})

        if(filteredGuitars.length === 0) {
            res.status(404).json({message: 'No matching guitars found'})
        }

        res.status(200).json(filteredGuitars)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteGuitar = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGuitar = await guitarSchema.deleteOne({ _id: id });

        if(deletedGuitar.deletedCount === 0) {
            return res.status(404).json({message: 'Guitar nout found'});
        }

        res.status(200).json({ message: 'Guitar deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}