// pages/api/dataset.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const datasetPath = 'public/dataset'; // Adjust the path accordingly
    const personDirectories = await fs.promises.readdir(datasetPath);

    const labeledFaceDescriptors = [];

    await Promise.all(
        personDirectories.map(async (personDir) => {
            const personPath = path.join(datasetPath, personDir);
            const images = await fs.promises.readdir(personPath);

            const faceDescriptors = await Promise.all(
                images.map(async (image) => {
                    const imagePath = path.join(personPath, image);
                    // Additional logic to read the image or other data if needed
                    return { imagePath, descriptor: null }; // Placeholder for the descriptor
                })
            );

            labeledFaceDescriptors.push({ person: personDir, faceDescriptors });
        })
    );

    res.status(200).json(labeledFaceDescriptors);
}
