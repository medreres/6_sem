import {gql} from '@apollo/client';

export const loginMutation = gql`
  mutation login($input: Auth!) {
    login(input: $input) {
      message
    }
  }
`;
