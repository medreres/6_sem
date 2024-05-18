import {gql} from '@apollo/client';

export const meQuery = gql`
  query me {
    me {
      email
      cities {
        address
        name
      }
    }
  }
`;
