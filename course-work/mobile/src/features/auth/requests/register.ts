import {gql} from '@apollo/client';

export const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(input: {email: $email, password: $password}) {
      message
    }
  }
`;
