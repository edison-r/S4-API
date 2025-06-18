// Types para cats y dogs

export type CatFactResponse = {
    data: string[]; 
};

export type DogFactResponse = {
    data: {
        id: string;
        type: string;
        attributes: {
            body: string;
        };
    }[];
};

export type CatImageResponse = {
  url: string;
};