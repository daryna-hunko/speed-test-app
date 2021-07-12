const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const fetch = require('node-fetch');

const NewsType = require("./TypeDefs/NewsType");
const WeatherType = require("./TypeDefs/WeatherType");

// const newsData = require("../MOCK_NEWS_DATA.json");
// const weatherData = require("../MOCK_WEATHER_DATA.json");


const getNewsData = async () => {
  try {
    const responseNews = await fetch('https://content.guardianapis.com/search?section=science&order-by=newest&show-elements=all&show-fields=all&q=space%2C%20technology&api-key=a9cd8943-4ed2-4441-b3d4-4cbf89189828');
    const jsonNews = await responseNews.json();
    return jsonNews;
  } catch (error) {
    console.log(error);
  }
}
const getWeatherData = async () => {
  try {
    const responseWeather = await fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json');
    const jsonWeather = await responseWeather.json();
    return jsonWeather;
  } catch (error) {
    console.log(error);
  }
}



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllNews: {
      type: NewsType,
      resolve(parent, args) {
        return getNewsData();
      },
    },
    getAllWeather: {
      type: WeatherType,
      resolve(parent, args) {
        return getWeatherData();
      },
    }
  },
});



module.exports = new GraphQLSchema({ query: RootQuery });
