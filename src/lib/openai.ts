import { ImagesResponse } from 'openai';

export function imagesFromBase64Response(response: ImagesResponse): Buffer[] {
    const data = response.data;
    const resultData: string[] = data.map((d) => d.b64_json) as string[];
    return resultData.map((j) => Buffer.from(j, "base64"));
}
