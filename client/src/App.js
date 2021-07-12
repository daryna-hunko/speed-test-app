import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Header from './Components/Header';
import SoapVsRest from './Components/SoapVsRest';
import GraphVsRest from './Components/GraphVsRest';

const StyledH1 = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 30px 10px;
  font-size: 1.5rem;
  text-align: center;
  width: 70%;
  margin: 0 auto;
`

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <StyledH1>This app is build for the fun with API</StyledH1>
          </Route>
          <Route path="/SOAPvsREST">
            <StyledH1>SOAP vs REST</StyledH1>
            <SoapVsRest />
          </Route>
          <Route path="/RESTvsGraphQL">
            <StyledH1>REST vs GraphQL</StyledH1>
            <GraphVsRest />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
