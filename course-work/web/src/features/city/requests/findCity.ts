import { gql } from "@apollo/client";

export const FIND_CITY = gql`
  query findCity($city: CityInput!) {
    findCity(input: $city) {
      name
      address
    }
  }
`;
