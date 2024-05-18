import {gql} from '@apollo/client';

export const FORECAST_CARD = gql`
  query forecastCard($cityName: CityInput!) {
    forecast(input: $cityName) {
      city {
        name
        address
      }
      current {
        weather {
          main
          icon
        }
        humidity
        feelsLike
      }
      daily {
        windSpeed
        temperature {
          day
        }
      }
    }
  }
`;
