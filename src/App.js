import './App.css';
import Generation from "./pages/Generation";
import CenteredToast from "./components/UI/CenteredToast";
import React, {useState} from "react";
import {AppContext} from "./context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Filters from "./pages/Filters";
import Save from "./pages/Save";


function App() {
  const [toastText, setToastText] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [imageBase64, setImageBase64] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  return (
    <AppContext.Provider value={{
      toastText, setToastText,
      showToast, setShowToast,
      imageBase64, setImageBase64,
      imageUrl, setImageUrl
    }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Generation />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/save" element={<Save />} />
            <Route path="*" element={<Generation />} />
          </Routes>
        </BrowserRouter>
        <CenteredToast showToast={showToast} text={toastText} setShowToast={setShowToast}/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
