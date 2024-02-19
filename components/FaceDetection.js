// components/FaceDetection.js

import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import {
    loadFaceLandmarkModel,
    loadFaceRecognitionModel,
    loadSsdMobilenetv1Model,
    FaceMatcher,
    LabeledFaceDescriptors,
    detectSingleFace,
} from 'face-api.js';

const MODEL_URL = '@/models/model_face';
const FACE_MATCHER_THRESHOLD = 0.6;

const loadModels = async () => {
    await loadSsdMobilenetv1Model(MODEL_URL);
    await loadFaceLandmarkModel(MODEL_URL);
    await loadFaceRecognitionModel(MODEL_URL);
};

const processImagesForRecognition = async () => {
    const labeledFaceDescriptors = [];

    // Replace 'public/dataset' with the actual path to your dataset
    const datasetPath = 'public/dataset';

    const personDirectories = await fs.promises.readdir(datasetPath);

    await Promise.all(
        personDirectories.map(async (personDir) => {
            const personPath = path.join(datasetPath, personDir);
            const images = await fs.promises.readdir(personPath);

            const faceDescriptors = await Promise.all(
                images.map(async (image) => {
                    const imagePath = path.join(personPath, image);
                    const img = await canvas.loadImage(`file://${imagePath}`);
                    const faceDescription = await detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor();

                    if (!faceDescription) {
                        throw new Error(`No face detected in ${imagePath}`);
                    }

                    return faceDescription.descriptor;
                })
            );

            labeledFaceDescriptors.push(new LabeledFaceDescriptors(personDir, faceDescriptors));
        })
    );

    return new FaceMatcher(labeledFaceDescriptors, FACE_MATCHER_THRESHOLD);
};

export { loadModels, processImagesForRecognition };
