import {gql} from '@apollo/client';

export const ADD_CITY = gql`
  mutation addCity($cityName: String!) {
    addCity(input: {cityName: $cityName}) {
      cities
    }
  }
`;
