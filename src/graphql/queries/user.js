import { gql } from "@apollo/client";

export const GET_USER = gql`
   {
       user {
        lastName
        firstName
        email
        id
      }
   }
`;