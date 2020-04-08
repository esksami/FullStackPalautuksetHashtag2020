import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2'


const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/name/${name}?fullText=true`)
    return response.data[0]
  } catch (err) {
    console.log(err)
    return
  }
}

export default {
  getCountryByName
}