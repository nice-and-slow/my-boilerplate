import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        user: loginUser(email: $email, password: $password) {
            token
        }
    }
`;

export const GET_USER = gql`
    query {
        fetchUser {
            email
        }
    }
`;

export const REGISTER_USER = gql`
    mutation signUpUser($name: String!, $email: String!, $password: String!) {
        user: signupUser(name: $name, email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export const GET_CONTRACTS_QUERY = gql`
    query getAllContracts {
        contracts: fetchAllContracts {
            id
            title
            description
        }
    }
`;

export const CREATE_CONTRACT = gql`
    mutation createContract($title: String!, $description: String!) {
        createContract(title: $title, description: $description) {
            id
            title
            description
        }
    }
`;
