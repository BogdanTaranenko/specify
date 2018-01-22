import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import { merge } from 'lodash';

import spiceResolvers from './spice/resolvers';
import SpiceSchema from './spice/spice.graphql';

import categoryResolvers from './category/resolvers';
import CategorySchema from './category/category.graphql';

const baseSchema = `
 schema {
    query: Query,
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    SpiceSchema,
    CategorySchema,
  ],
  resolvers: merge(
    {},
    spiceResolvers,
    categoryResolvers,
  ),
});


const graphQLRouter = graphqlExpress(() => ({
  schema,
}));

export default graphQLRouter;
