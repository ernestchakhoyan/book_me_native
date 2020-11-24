import { gql } from "@apollo/client";

export const LOGIN = gql`
   mutation Login($username: String, $password: String){
        login(email: $username, password: $password){
            token
        }
   }
`;