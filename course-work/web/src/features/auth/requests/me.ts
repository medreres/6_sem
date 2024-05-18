import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      email
      cities {
        address
      }
    }
  }
`;
