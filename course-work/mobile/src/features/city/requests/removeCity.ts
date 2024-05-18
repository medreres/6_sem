import {gql} from '@apollo/client';

export const REMOVE_CITY = gql`
  mutation removeCity($cityName: String!) {
    removeCity(input: {cityName: $cityName}) {
      cities
    }
  }
`;
