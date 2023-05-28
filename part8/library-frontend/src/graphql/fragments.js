import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      bookCount
      born
      id
      name
    }
    genres
    id
    published
    title
  }
`;
