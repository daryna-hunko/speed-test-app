const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;


const SolesType = new GraphQLObjectType({
  name: 'SolesType',
  fields: () => ({
    id: { type: GraphQLString },
    terrestrial_date: { type: GraphQLString },
    sol: { type: GraphQLString },
    ls: { type: GraphQLString },
    season: { type: GraphQLString },
    min_temp: { type: GraphQLString },
    max_temp: { type: GraphQLString },
    pressure: { type: GraphQLString },
    pressure_string: { type: GraphQLString },
    abs_humidity: { type: GraphQLString },
    wind_speed: { type: GraphQLString },
    wind_direction: { type: GraphQLString },
    atmo_opacity: { type: GraphQLString },
    sunrise: { type: GraphQLString },
    sunset: { type: GraphQLString },
    local_uv_irradiance_index: { type: GraphQLString },
    min_gts_temp: { type: GraphQLString },
    max_gts_temp: { type: GraphQLString }
  })
})

const WeatherDescriptionsType = new GraphQLObjectType({
  name: 'WeatherDescriptionsType',
  fields: () => ({
    disclaimer_en: { type: GraphQLString },
    disclaimer_es: { type: GraphQLString },
    sol_desc_en: { type: GraphQLString },
    sol_desc_es: { type: GraphQLString },
    terrestrial_date_desc_en: { type: GraphQLString },
    terrestrial_date_desc_es: { type: GraphQLString },
    temp_desc_en: { type: GraphQLString },
    temp_desc_es: { type: GraphQLString },
    pressure_desc_en: { type: GraphQLString },
    pressure_desc_es: { type: GraphQLString },
    abs_humidity_desc_en: { type: GraphQLString },
    abs_humidity_desc_es: { type: GraphQLString },
    wind_desc_en: { type: GraphQLString },
    wind_desc_es: { type: GraphQLString },
    gts_temp_desc_en: { type: GraphQLString },
    gts_temp_desc_es: { type: GraphQLString },
    local_uv_irradiance_index_desc_en: { type: GraphQLString },
    local_uv_irradiance_index_desc_es: { type: GraphQLString },
    atmo_opacity_desc_en: { type: GraphQLString },
    atmo_opacity_desc_es: { type: GraphQLString },
    ls_desc_en: { type: GraphQLString },
    ls_desc_es: { type: GraphQLString },
    season_desc_en: { type: GraphQLString },
    season_desc_es: { type: GraphQLString },
    sunrise_sunset_desc_en: { type: GraphQLString },
    sunrise_sunset_desc_es: { type: GraphQLString }
  })
})

const WeatherType = new GraphQLObjectType({
  name: "WeatherType",
  fields: () => ({
    descriptions:  { type: WeatherDescriptionsType},
    soles: { type: new GraphQLList(SolesType) }
  }),
});

module.exports = WeatherType;