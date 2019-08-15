import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

// constants
const UNAUTHORIZED = 'Forbidden';
const FORBIDDEN = 'Unauthorized';
// const NOT_ALLOWED = 'Not allowed';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors && graphQLErrors.filter(e => e).length > 0) {
        graphQLErrors.map(({ message = '', status = 200 }) => {
            if (UNAUTHORIZED === message || status === 401) {
                console.warn(
                    `You've attempted to access ${UNAUTHORIZED} section`,
                );
            }
            if (FORBIDDEN === message || status === 403) {
                console.warn(`You've attempted a ${FORBIDDEN} action`);
            }
            return null;
        });

        if (networkError && networkError.statusCode === 401) {
            console.warn(UNAUTHORIZED);
        }
        if (networkError && networkError.statusCode === 403) {
            console.warn(FORBIDDEN);
        }
        if (networkError && networkError.statusCode >= 500) {
            console.warn('SERVER ERROR');
        }
    }
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('authToken');
    return {
        headers: Object.assign({}, headers, {
            Authorization: token ? `Bearer ${token}` : '',
        }),
    };
});

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_URL}`,
});

const links = [errorLink, authLink, httpLink];
const link = ApolloLink.from(links);

const defaultOptions = {
    query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
    },
};

const apolloCache = new InMemoryCache({
    dataIdFromObject: e => `${e.__typename}_${e.id}` || null,
});

const configs = {
    link,
    cache: apolloCache,
    defaultOptions,
};

export default configs;
