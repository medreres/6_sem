import { gql } from "@apollo/client";

export const ADD_CITY = gql`
  mutation ($cityName: String!) {
    addCity(input: { cityName: $cityName }) {
      cities
    }
  }
`;
