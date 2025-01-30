export interface PotSize {
    sizeInCm: number;
    sizeInInches: number;
    usGallons: number;
    cuFt: number;
    liters: number;
    litersStandard?: number;
  }
  
  export const potSizes: { [key: string]: PotSize } = {
    "4": { sizeInCm: 10, sizeInInches: 4, usGallons: 0.125, cuFt: 0.01, liters: 0.473, litersStandard: 0.5 },
    "5-6": { sizeInCm: 15, sizeInInches: 5.5, usGallons: 0.25, cuFt: 0.03, liters: 0.946, litersStandard: 1 },
    "7-8": { sizeInCm: 20, sizeInInches: 7.5, usGallons: 1, cuFt: 0.13, liters: 3.78, litersStandard: 4 },
    "8.5": { sizeInCm: 22, sizeInInches: 8.5, usGallons: 2, cuFt: 0.26, liters: 7.57, litersStandard: 7.5 },
    "10": { sizeInCm: 25, sizeInInches: 10, usGallons: 3, cuFt: 0.40, liters: 11.35, litersStandard: 11 },
    "11": { sizeInCm: 28, sizeInInches: 11, usGallons: 4, cuFt: 0.53, liters: 15.14, litersStandard: 15 },
    "12": { sizeInCm: 30, sizeInInches: 12, usGallons: 5, cuFt: 0.66, liters: 18.92, litersStandard: 19 },
    "13": { sizeInCm: 33, sizeInInches: 13, usGallons: 6, cuFt: 0.80, liters: 22.71, litersStandard: 22.5 },
    "14": { sizeInCm: 35, sizeInInches: 14, usGallons: 7, cuFt: 0.94, liters: 26.49, litersStandard: 26.5 },
    "16": { sizeInCm: 40, sizeInInches: 16, usGallons: 10, cuFt: 1.33, liters: 37.85, litersStandard: 38 },
    "18": { sizeInCm: 45, sizeInInches: 18, usGallons: 15, cuFt: 2.00, liters: 56.78,   litersStandard: 57 },
    "21": { sizeInCm: 53, sizeInInches: 21, usGallons: 20, cuFt: 2.67, liters: 75.70, litersStandard: 75.5 },
    "24": { sizeInCm: 60, sizeInInches: 24, usGallons: 25, cuFt: 3.34, liters: 94.63, litersStandard: 94.5 },
    "30": { sizeInCm: 76, sizeInInches: 30, usGallons: 30, cuFt: 4.01, liters: 113.56, litersStandard: 113.5 },
  };