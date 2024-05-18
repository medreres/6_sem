import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($input: Auth!) {
    login(input: $input) {
      message
    }
  }
`;
