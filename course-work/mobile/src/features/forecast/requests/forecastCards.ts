import {gql} from '@apollo/client';

export const FORECAST_CARDS = gql`
  query forecastCards($cities: [CityInput!]!) {
    forecasts(input: $cities) {
      city {
        name
        address
      }
      daily {
        windSpeed
        humidity
        temperature {
          min
          max
          day
          night
        }
        weather {
          main
          icon
        }
      }
    }
  }
`;
