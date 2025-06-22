import dimensions from '../config/dimensions.json'
import type { ImageDimension } from '../service/ImageProcessor';

export const getIOSDimensions = () => {
    return (dimensions as ImageDimension[]).filter((dimension) => dimension.os === 'iOS');
};

export const getAndroidDimensions = () => {
    return (dimensions as ImageDimension[]).filter((dimension) => dimension.os === 'Android');
};

export const getAllDimensions = () => {
    return dimensions as ImageDimension[];
};