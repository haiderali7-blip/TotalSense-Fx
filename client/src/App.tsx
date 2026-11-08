import "./App.css";
import axios from "axios";
import { useState } from "react";
import { VscRunAll } from "react-icons/vsc";

interface analysisReport {
  [key: string]: string;
}
function App() {
  const [prompt, setPrompt] = useState({prompt: "",});
  const [analysisReport, setAnalysisReport] = useState<analysisReport>({});
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,)
  {
    const id = e.target.id;
    const value = e.target.value;
    setPrompt({ ...prompt, [id]: value });
  }
  function handleSubmitBtn() {
    setAnalysisReport({});
    postQuery();
    setPrompt({ ...prompt, ["prompt"]: "" });
  }
  function postQuery() {
    axios.post("https://totalsense-fx.onrender.com/api/v1/chat/", prompt)
      .then((Response) => {
        const report = Response.data.analyzed_report;
        setAnalysisReport({...analysisReport,...report});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <section className="container">
        <div className="advertisement ad1"></div>
        <div className="main">
          <div className="main__header">
            <h3 className="main__heading">TotalSenseFx:</h3>
            <p className="main__Tagline">
              Turning global market noise into actionable Forex intelligence.
            </p>
          </div>
          <div className="search-box">
            <input className="search-box__input" id="prompt" value={prompt.prompt} onChange={handleInputChange} type="text" placeholder="analyze any instrument."/>
            <div className="search-box__btn-wrapper">
              <button className="search-box__btn" onClick={handleSubmitBtn}>
                <span>Run Ctrl</span> <VscRunAll className="search-box__icon" />
              </button>
            </div>
          </div>
          <div className="report-box">
            <div className="color-circles">
              <div className="cirles circle--red"></div>
              <div className="cirles circle--yellow"></div>
              <div className="cirles circle--green"></div>
            </div>
            <div className="report-box__content">
              <div className="report-box__wrapper">
                {Object.keys(analysisReport).map((key) => {
                  return (
                    <>
                      <h4 className="report-box__content-heading" key={key}>
                        {key}:
                      </h4>
                      <p className="report-box__paragraph">
                        {analysisReport[key]}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="usage">
          <div className="usage__about">
            <h3 className="usage__heading">About:</h3>
            <p className="usage__description">
              TotalSense FX is an AI-powered sentiment analysis platform
              designed to give Forex traders a definitive edge. By scanning
              millions of real-time data points—from breaking financial news to
              social market chatter—TotalSense FX decodes global market
              psychology, turning noise into actionable insights so you can
              anticipate currency movements before they happen
            </p>
          </div>
          <div className="usage_commands">
            <h3 className="usage__heading">how to use?</h3>
            <p className="usage__description">
              TotalSenseFx understands commands like "scan for bullish setups"
              or "analyze EUR/USD" and delivers comprehensive analysis in
              seconds.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default App;
