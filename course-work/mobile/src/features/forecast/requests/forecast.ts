import {gql} from '@apollo/client';

export const FORECAST = gql`
  query forecast($city: CityInput!) {
    forecast(input: $city) {
      city {
        name
        address
      }
      daily {
        timestamp
        temperature {
          min
          max
          day
        }
        humidity
        precipitation
        sunrise
        sunset
        uvi
        windSpeed
        weather {
          icon
          main
        }
        precipitation
      }
      hourly {
        timestamp
        temperature
        humidity
        weather {
          main
          icon
        }
      }
      current {
        feelsLike
        weather {
          icon
          main
        }
      }
    }
  }
`;
