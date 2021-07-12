import { useState, useEffect } from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  text-align: center;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  > div {
    width: 50%;

  }
`

export default function SoapVsRest(props) {
  const [SOAPState, setSOAPState] = useState([]);
  const [RESTState, setRESTState] = useState([]);
  const [RESTTimeState, setRESTTimeState] = useState('');
  const [SOAPTimeState, setSOAPSTimetate] = useState('');
  let t0_s, t0_r, t1_s, t1_r;

  useEffect(() => {
    t0_r = performance.now();
    fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5') 
      .then(response => response.text())
      .then(data => {
        let XmlNode = new DOMParser().parseFromString(data, 'text/xml');

        let dataArr = xmlToJson(XmlNode);
        dataArr.exchangerates !== undefined ? 
          setRESTState(JSON.stringify(dataArr.exchangerates.row))
          : setRESTState(JSON.stringify(dataArr))
        t1_r = performance.now();
        setRESTTimeState(t1_r-t0_r);
      })

    t0_s = performance.now();
    fetch("http://www.cbr.ru/scripts/XML_daily.asp?date_req=02/03/2020", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "no-cors",
      "credentials": "include"
    }).then(response => response.text())
    .then(data => {
      let XmlNode = new DOMParser().parseFromString(data, 'text/xml');
      setSOAPState(JSON.stringify(xmlToJson(XmlNode)));
      t1_s = performance.now();
      setSOAPSTimetate(t1_s-t0_s);
    });
  }, [])

  const xmlToJson = (xml) => {
    // Create the return object
    var obj = {};
  
    if (xml.nodeType === 1) {
      // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      // text
      obj = xml.nodeValue;
    }
  
    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
      return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
      obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
        return text + node.nodeValue;
      }, "");
    } else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }

  // const arr = JSON.parse(RESTState);
  // const list = [];
  // if (!arr.error) {
  //   arr.map((el, i) => {
  //     let string = "ccy: " + el.exchangerate['@attributes'].ccy + " | base_ccy: " + el.exchangerate['@attributes'].base_ccy + " | buy: " + el.exchangerate['@attributes'].buy + " | sale: " + el.exchangerate['@attributes'].sale;
  //     list.push(<li key={i}>{string}</li>);
  //   })
  // } 
  return (
    <StyledDiv>
      <div>
        <h2>SOAP request took {SOAPTimeState} ms</h2>
        {SOAPState.length ? (
          <p>{SOAPState}</p>
        ) : 
        <p>No SOAP request data! Check something and fix it!</p>}
      </div>
      <div>
        <h2>REST request took {RESTTimeState} ms</h2>
        {RESTState.length ? (
          <>
            <p>{RESTState}</p>
            {/* <ul>{list}</ul> */}
          </>
        ) : 
        <p>No REST request data! Check something and fix it!</p>}
      </div>
    </StyledDiv>
  );
};