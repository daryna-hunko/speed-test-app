const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } = graphql;

const NewsDataType = new GraphQLObjectType({
  name: 'NewsDataType',
  fields: () => ({
    headline: { type: GraphQLString },
    standfirst: { type: GraphQLString },
    trailText: { type: GraphQLString },
    byline: { type: GraphQLString },
    main: { type: GraphQLString },
    body: { type: GraphQLString },
    newspaperPageNumber: { type: GraphQLInt },
    wordcount: { type: GraphQLInt },
    firstPublicationDate: { type: GraphQLString },
    isInappropriateForSponsorship: { type: GraphQLBoolean },
    isPremoderated: { type: GraphQLBoolean },
    lastModified: { type: GraphQLString },
    newspaperEditionDate: { type: GraphQLString },
    productionOffice: { type: GraphQLString },
    publication: { type: GraphQLString },
    shortUrl: { type: GraphQLString },
    shouldHideAdverts: { type: GraphQLBoolean },
    showInRelatedContent: { type: GraphQLBoolean },
    thumbnail: { type: GraphQLString },
    legallySensitive: { type: GraphQLBoolean },
    lang: { type: GraphQLString },
    isLive: { type: GraphQLBoolean },
    bodyText: { type: GraphQLString },
    charCount: { type: GraphQLInt },
    shouldHideReaderRevenue: { type: GraphQLBoolean },
    showAffiliateLinks: { type: GraphQLBoolean },
    bylineHtml: { type: GraphQLString }
  })
})

const NewsType = new GraphQLObjectType({
  name: 'NewsType',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    sectionId: { type: GraphQLString },
    sectionName: { type: GraphQLString },
    webPublicationDate: { type: GraphQLString },
    webTitle: { type: GraphQLString },
    webUrl: { type: GraphQLString },
    apiUrl: { type: GraphQLString },
    fields: { type: NewsDataType},
    isHosted: { type: GraphQLBoolean },
    pillarId: { type: GraphQLString },
    pillarName: { type: GraphQLString },
  })
})


const InnerResponseType = new GraphQLObjectType({
  name: 'InnerResponseType',
  fields: () => ({
    status: { type: GraphQLString },
    userTier: { type: GraphQLString },
    total: { type: GraphQLInt },
    startIndex: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    currentPage: { type: GraphQLInt },
    pages: { type: GraphQLInt },
    orderBy: { type: GraphQLString },
    results: { type: new GraphQLList(NewsType) }
  })
})

const NewsResponseType = new GraphQLObjectType({
  name: 'NewsResponse',
  fields: () => ({
    response: { type: InnerResponseType}
  })
})

module.exports = NewsResponseType;