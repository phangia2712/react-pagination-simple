import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Functions from "./services/Functions";
import "./App.css";

import List from "./components/List";
import FormSearch from "./components/FormSearch";

function App() {

  const [info, setInfo] = useState({
    totalPage: 0,
    currentPage: 1,
    itemsPerPage: [],
    limit: 10,
    name_like: '',
    // activeDisabled: false,
    // disablePrevious: false,
    // disableNext: false
  });

  let btnPrevious = React.createRef()
  let btnNext = React.createRef()

  function handlePrevious () {
    // cach te nhat lam lùi quá số 1 và khi next thì ko bỏ disable nút dc
    // if (info.currentPage <= 0) {
    //   setInfo({ ...info, disablePrevious: true})
    // } else {
    //   setInfo({ ...info, currentPage: info.currentPage - 1, disablePrevious: false})
    // }

    // cách này fix dc vấn đề lùi quá số 1, nhưng vấn đề đứng tại số 1 mà button ko bị disable đc. và khi next thì ko bỏ disable nút dc
    // if (info.currentPage > 1) {
    //     setInfo({ ...info, currentPage: info.currentPage - 1, disablePrevious: false})
    //   } else {
    //     setInfo({ ...info, disablePrevious: true})
    //   }
  
   
    setInfo({ ...info, currentPage: info.currentPage - 1 })
  
  }
  function handleNext (e) {
    // if (info.currentPage >= info.totalPage) {
    //   setInfo({ ...info, disableNext: true})
    // } else {
    //   setInfo({ ...info, currentPage: info.currentPage + 1, disableNext: false})
    // }

    // if (info.currentPage < info.totalPage) {
    //   setInfo({ ...info, currentPage: info.currentPage + 1, disableNext: false})
    // } else {
    //   setInfo({ ...info, disableNext: true})
    // }
  
    setInfo({ ...info, currentPage: info.currentPage + 1 })
   
  }

  function handleSearch (strSearch) {
    console.log(strSearch)
    setInfo({ ...info, currentPage: 1, name_like: strSearch })
  }



  useEffect(() => {
    const parsed = {
      // page, limit, search la nhung bien GET do mockAPI cung cap, ta phai viet dung nhu vay
      page: info.currentPage,
      limit: info.limit,
      search: info.name_like
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
  }, [info.currentPage, info.name_like])


  return (
    <div className="App">
      <FormSearch propSearch={handleSearch} />
      <List data={info.itemsPerPage} />
      <div className="group">
  <h1>Page: { info.currentPage }/{ info.totalPage }</h1>
        <button ref={btnPrevious} disabled={info.currentPage === 1} onClick={handlePrevious}>Previous</button>
        <button ref={btnNext} disabled={info.currentPage === info.totalPage} onClick={handleNext} onDoubleClick={() => console.log('DB click')}>Next</button>
      </div>
    </div>
  );
}

export default App;
