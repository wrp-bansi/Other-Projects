import { gql } from '@apollo/client';

export const ADD_USER = gql`
 mutation CreateUser($name: String!) {
     createUser(name: $name) {
       id
       name
     }
   }
`;


// export const UPDATE_USER=gql`
// mutation UpdateUser($id:ID!,$name: String!) {
//     updateUser(id: $id, name: $name) {
//       id
//       name
//     }
//   }

// `;
export const UPDATE_USER=gql
`mutation UpdateUser($id:Int!,$name: String!){
  updateUser(id: $id, name: $name) {
    id
    name
  }
}
`;
// export const DELETE_USER = gql`
// mutation DeleteUser($id:Int!) {
//   deleteUser(id: $id,) {
//     id
//   }
// }
// `;