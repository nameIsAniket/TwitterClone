/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }    \n": types.CreateTweetDocument,
    "\n    query GetAllTweets {\n        getAllTweets {\n            id\n            tweet\n            imageURL\n            author {\n            id\n            firstName\n            lastName\n            profileImage\n            }\n        }\n    }\n": types.GetAllTweetsDocument,
    "\n    #graphql\n    query verifyGoogleToken($token: String) {\n        verifyGoogleToken(token: $token)\n    }\n    query ExampleQuery {\n        getCurrentUser {\n            id\n            email\n            firstName\n            lastName\n            profileImage\n        }\n    }\n": types.VerifyGoogleTokenDocument,
    "\n    #graphql\n    query getCurrentUser {\n        getCurrentUser {\n            id\n            email\n            firstName\n            lastName\n            profileImage\n             tweets {\n                tweet\n                imageURL\n                id\n                author {\n                    profileImage\n                    firstName\n                    lastName\n                }\n            }\n        }\n    }\n": types.GetCurrentUserDocument,
    "\n#graphql\nquery GetUserByID($givenId: ID!) {\n  getUserByID(givenId: $givenId) {\n    id\n    firstName\n    lastName\n    profileImage\n    tweets {\n      id\n      tweet\n      author {\n        id\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n}": types.GetUserByIdDocument,
    "\n    query getSignedURLForTweet($imageType: String!, $imageName: String!) {\n        getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n      }": types.GetSignedUrlForTweetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }    \n"): (typeof documents)["\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllTweets {\n        getAllTweets {\n            id\n            tweet\n            imageURL\n            author {\n            id\n            firstName\n            lastName\n            profileImage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetAllTweets {\n        getAllTweets {\n            id\n            tweet\n            imageURL\n            author {\n            id\n            firstName\n            lastName\n            profileImage\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query verifyGoogleToken($token: String) {\n        verifyGoogleToken(token: $token)\n    }\n    query ExampleQuery {\n        getCurrentUser {\n            id\n            email\n            firstName\n            lastName\n            profileImage\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query verifyGoogleToken($token: String) {\n        verifyGoogleToken(token: $token)\n    }\n    query ExampleQuery {\n        getCurrentUser {\n            id\n            email\n            firstName\n            lastName\n            profileImage\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query getCurrentUser {\n        getCurrentUser {\n            id\n            email\n            firstName\n            lastName\n            profileImage\n             tweets {\n                tweet\n                imageURL\n                id\n                author {\n                    profileImage\n                    firstName\n                    lastName\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query getCurrentUser {\n        getCurrentUser {\n            id\n            email\n            firstName\n            lastName\n            profileImage\n             tweets {\n                tweet\n                imageURL\n                id\n                author {\n                    profileImage\n                    firstName\n                    lastName\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\nquery GetUserByID($givenId: ID!) {\n  getUserByID(givenId: $givenId) {\n    id\n    firstName\n    lastName\n    profileImage\n    tweets {\n      id\n      tweet\n      author {\n        id\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n}"): (typeof documents)["\n#graphql\nquery GetUserByID($givenId: ID!) {\n  getUserByID(givenId: $givenId) {\n    id\n    firstName\n    lastName\n    profileImage\n    tweets {\n      id\n      tweet\n      author {\n        id\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getSignedURLForTweet($imageType: String!, $imageName: String!) {\n        getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n      }"): (typeof documents)["\n    query getSignedURLForTweet($imageType: String!, $imageName: String!) {\n        getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n      }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;