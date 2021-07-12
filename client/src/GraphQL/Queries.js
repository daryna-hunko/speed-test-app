import { gql } from "@apollo/client";

export const LOAD_DATA = gql`
  query {
    getAllNews {
      response {
        results {
          webPublicationDate
          fields {
            trailText
          }
        }
      }
    }
    getAllWeather {
      soles {
        terrestrial_date
        sol
      }
    }
  }
`;
