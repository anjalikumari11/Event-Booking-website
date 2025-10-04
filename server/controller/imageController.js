import fs from "fs";
import path from "path";

export const getAllImages = async (req, res) => {
    try {
        const uploadDir = path.join(process.cwd(), "uploads");

        fs.readdir(uploadDir, (err, files) => {
            if (err) return res.status(500).json({ message: "Error reading uploads folder" });
           
            const images = files.filter(file =>
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
            );

            res.status(200).json({
                message: "Images fetched successfully",
                data: images.map(file => `http://localhost:5000/uploads/${file}`),
            });
        })

    } catch (error) {
    res.status(500).json({
      message: "Error fetching images",
      error: error.message,
    });

    }
}