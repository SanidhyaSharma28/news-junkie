import './App.css';
import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import AboutUs from './components/AboutUs';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

const App=()=>{

  let apikey=process.env.REACT_APP_NEWS_API
  
  const[SearchQuery,setSearchQuery]=useState("")
  const[progress,setprogress]=useState(0)
  const[mode,setMode]=useState('light')

  const setProgress=(progress)=>{
    setprogress(progress)
  }

  const togglemode=()=>{
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = '#1c1c1c'
    }
    else {
      setMode('light')
      document.body.style.backgroundColor = 'white'
    }
  }
  const HandleSearch = (query) => {
    setSearchQuery(query)
    }

    return (
      <Router>
        <div>

          <Navbar onsearch={HandleSearch} mode={mode} togglemode={togglemode}/>
          <LoadingBar color='#f11946' progress={progress} height={4} onLoaderFinished={() => setProgress(0)}/>

          <Routes>
            <Route exact path="/" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="general" pagesize={8}  category="general" />}></Route>
            <Route exact path="/home" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery="" key="general" pagesize={8}  category="general" />}></Route>
            <Route exact path="/about" element={<AboutUs />}></Route>
            <Route exact path="/business" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="business" pagesize={8}  category="business" />}></Route>
            <Route exact path="/entertainment" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="entertainment" pagesize={8}  category="entertainment" />}></Route>
            <Route exact path="/health" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="health" pagesize={8}  category="health" />}></Route>
            <Route exact path="/science" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="science" pagesize={8}  category="science" />}></Route>
            <Route exact path="/sports" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="sports" pagesize={8}  category="sports" />}></Route>
            <Route exact path="/technology" element={<News mode={mode} setProgress={setProgress} apikey={apikey} SearchQuery={SearchQuery} key="technology" pagesize={8}  category="technology" />}></Route>
          </Routes>
        </div>
      </Router>
    )
  
}

export default App;
