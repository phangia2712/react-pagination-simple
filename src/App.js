import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Functions from "./services/Functions";
import "./App.css";

import List from "./components/List";

function App() {

  const [info, setInfo] = useState({
    totalPage: 0,
    currentPage: 1,
    itemsPerPage: [],
    limit: 10,
    disablePrevious: false,
    disableNext: false
  });

  function handlePrevious () {
    // debugger
    if (info.currentPage <= 0) {
      setInfo({ ...info, disablePrevious: true})
    } else {
      setInfo({ ...info, currentPage: info.currentPage - 1, disablePrevious: false})
    }
    
  }
  function handleNext () {
    if (info.currentPage >= info.totalPage) {
      setInfo({ ...info, disableNext: true})
    } else {
      setInfo({ ...info, currentPage: info.currentPage + 1, disableNext: false})
    }
    
  }

  useEffect(() => {
    const parsed = {
      page: info.currentPage,
      limit: info.limit,
    };
    console.log('parsed',parsed)
    const stringified = queryString.stringify(parsed);
    // Functions.fetchData(`http://localhost:3000/posts?_page=2&_limit=10`)
    Functions.fetchData(
      `https://5eb3b991974fee0016ecd8bb.mockapi.io/api/v1/blog`,
      `https://5eb3b991974fee0016ecd8bb.mockapi.io/api/v1/blog?${stringified}`
    )
      .then((res) => {
        console.log("res", res)
        let totalPage = Math.ceil(res[0].length / parsed.limit)
        console.log("totalPage:", totalPage)
        setInfo({ ...info, totalPage: totalPage, itemsPerPage: res[1] })
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.currentPage, info.disablePrevious, info.disableNext]);

  return (
    <div className="App">
      <List data={info.itemsPerPage} />
      <div className="group">
        <button disabled={info.disablePrevious} onClick={handlePrevious}>Previous</button>
        <button disabled={info.disableNext} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
