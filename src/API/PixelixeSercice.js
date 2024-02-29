import axios from "axios";


export  const PixelixeSerciceFilters = ['none', 'clarendon', 'hefe', 'lofi', 'moon', 'ludwig', 'inkwell']

export class PixelixeSercice {

  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async applyFilter(imageUrl, filter){
    const options = {
      url: `https://studio.pixelixe.com/api/photo/effect/v2?apiKey=${this.apiKey}&preset=${filter}&imageUrl=${imageUrl}`,
    };

    const response = await axios.get(options.url,{ responseType: 'blob' })

    return response.data
  }

}