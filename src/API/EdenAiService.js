import axios from "axios";

export class EdenAiService {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async generate(prompt, width = 1024, height = 1024){
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        providers: "replicate",
        text: prompt,
        resolution: `${width}x${height}`,
        fallback_providers: "",
      },
    };

    const response = await axios.post(options.url, options.data, {
      headers: {
        ...options.headers
      },
    });
    return response.data
  }


}