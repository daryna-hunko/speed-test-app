import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { LOAD_DATA } from "../GraphQL/Queries";
import styled from 'styled-components';
const StyledDiv = styled.div`
  text-align: center;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  > div {
    width: 50%;
`
const StyledRESTState = styled.p`
  height: 200px;
  width: 80%;
  margin: 0 auto 15px;
  overflow: scroll;
  word-break: break-word;
  ~ ul {
    list-style: square;
    height: 200px;
    width: 80%;
    margin: 0 auto 15px;
    overflow: scroll;
    word-break: break-word;
    text-align: left;
  }
`

export default function GraphVsRest(props) {
  let t0_r, t1_s, t1_r;
  const [GraphState, setGraphState] = useState([]);
  const [RESTState, setRESTState] = useState([]);
  const [RESTTimeState, setRESTTimeState] = useState('');
  const [GraphTimeState, setGraphTimeState] = useState('');
  const [t0_s, sett0_s] = useState('');

  if (t0_s === '') sett0_s(performance.now())
  console.log(t0_s)
  const { error, loading, data } = useQuery(LOAD_DATA);


  
 

  useEffect(() => {
    t0_r = performance.now();
    Promise.all([
      fetch('https://content.guardianapis.com/search?section=science&order-by=newest&show-elements=all&show-fields=all&q=space%2C%20technology&api-key=a9cd8943-4ed2-4441-b3d4-4cbf89189828'),
      fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json')
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      const dataArr = [];
      dataArr.push(data[0].response.results.map(el => {
        let newObj = {};
        newObj.trailText = el.fields.trailText;
        newObj.publicationDate = el.webPublicationDate;
        return newObj
        }
      ))
      dataArr.push(data[1].soles.map(el => {
        let newObj = {};
        newObj.terrestrial_date = el.terrestrial_date;
        newObj.sol = el.sol;
        return newObj
        }
      ))
      setRESTState(JSON.stringify(dataArr));
      t1_r = performance.now();
      setRESTTimeState(t1_r-t0_r);
    }).catch(function (error) {
      console.log(error);
    });

    
    if (data) {
      setGraphState(JSON.stringify([data.getAllNews.response.results, data.getAllWeather.soles]));
      //console.log(GraphState)
      t1_s = performance.now();
      setGraphTimeState(t1_s-t0_s);
    }
  }, [])

  return (
    <StyledDiv>
      <div>
        <h2>GraphQL request took {GraphTimeState} ms</h2>
        {GraphState.length ? (
          <>
            <h3>THE RESPONSE</h3>
            <StyledRESTState>{GraphState}</StyledRESTState>
            
            <h3>THE DATA ABOUT SPACE ARTICLES</h3>
            <ul>
              {JSON.parse(GraphState)[0].map((d, idx) => {
                return (
                  <li key={idx}>
                    <h4>{d.webPublicationDate.slice(0,10)}</h4>
                    <p>{d.fields.trailText}</p>
                  </li>)
              })}
            </ul>
            <h3>THE DATA ABOUT WEATHER MEASUREMENTS ON MARS</h3>
            <ul>
              {JSON.parse(GraphState)[1].map((d, idx) => {
                return (
                  <li key={idx}>
                    {'SOL: ' + d.sol + ' | ' + d.terrestrial_date}
                  </li>)
              })}
            </ul>
          </>
        ) : 
        <p>No GraphQL request data! Check something and fix it!</p>}
      </div>
      <div>
        <h2>REST request took {RESTTimeState} ms</h2>
        {RESTState.length ? (
          <>
            <h3>THE RESPONSE</h3>
            <StyledRESTState>{RESTState}</StyledRESTState>
            <h3>THE DATA ABOUT SPACE ARTICLES</h3>
            <ul>
              {JSON.parse(RESTState)[0].map((d, idx) => {
                return (
                  <li key={idx}>
                    <h4>{d.publicationDate.slice(0,10)}</h4>
                    <p>{d.trailText}</p>
                  </li>)
              })}
            </ul>
            <h3>THE DATA ABOUT WEATHER MEASUREMENTS ON MARS</h3>
            <ul>
              {JSON.parse(RESTState)[1].map((d, idx) => {
                return (
                  <li key={idx}>
                    {'SOL: ' + d.sol + ' | ' + d.terrestrial_date}
                  </li>)
              })}
            </ul>
          </>
        ) : 
        <p>No REST request data! Check something and fix it!</p>}
      </div>
    </StyledDiv>
  );
};