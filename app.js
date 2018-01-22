// FOR ES7
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';

// MAIN
import express from 'express';
import mongoose from 'mongoose';

// MIDDLEWARES
import bodyParser from 'body-parser';
import cors from 'cors';

// GRAPHQL

import { graphiqlExpress } from 'apollo-server-express';

// AUTHENTICATION
import './services/passport';
import './models/User';

// ROUTES
import RootRouter from './routes';
import GraphQLRouter from './graphql/GraphQLRouter';

// CONFIGS
import keys from './config';

const app = express();
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(keys.mongoURI);
}

app.use(cors());
app.use(bodyParser.json());
app.use('/', RootRouter);
app.use('/graphql', GraphQLRouter);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

export default app;
