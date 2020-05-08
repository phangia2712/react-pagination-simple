import React, { useState,/* , useEffect */ 
useRef} from "react";

function FormSearch({ propSearch }) {

  const [inputForm, setInputForm] = useState({
    strSearch: ''
  })
  const typingTimeoutRef = useRef(null)

  const handleChangeInputForm = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setInputForm(prev => ({
            ...prev,
            [name]: value
    }))
    
    // neu da ton tai cai settimeout roi thi clear no di
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    // bat dau chay cai settimeout moi
    typingTimeoutRef.current = setTimeout(() => {
      propSearch(value)
    }, 2000);

    
    
}

// useEffect(() => {
//   propSearch(inputForm.strSearch)
// }, [inputForm.strSearch, propSearch])

  return (
        <form action="">
          <input type="text" name="strSearch" placeholder="Nhập công việc cần tìm" autoComplete="off" value={inputForm.strSearch} onChange={handleChangeInputForm}/>
        </form>
      )
}

export default FormSearch;
