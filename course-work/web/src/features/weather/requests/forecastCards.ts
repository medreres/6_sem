import { gql } from "@apollo/client";

export const FORECAST_CARDS = gql`
  query forecastCards($cities: [CityInput!]!) {
    forecasts(input: $cities) {
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
