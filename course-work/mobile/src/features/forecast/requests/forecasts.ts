import {gql} from '@apollo/client';

export const FORECASTS = gql`
  query forecasts($cities: [CityInput!]!) {
    forecasts(input: $cities) {
      city {
        name
        address
      }
      current {
        feelsLike
        weather {
          icon
        }
      }
      daily {
        precipitation
        windSpeed
      }
    }
  }
`;
