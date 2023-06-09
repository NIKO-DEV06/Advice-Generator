import React from "react";

import { useState, useEffect } from "react";

import diceLogo from "./images/icon-dice.svg";
import patternDesktop from "./images/pattern-divider-mobile.svg";
import Credit from "./components/credit";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [id, setId] = useState("");
  const [animate, setAnimate] = useState(false);

  const animateHandler = () => {
    setAnimate(!animate);
  };

  const fetchQuote = async () => {
    try {
      animateHandler();
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
      setId(data.slip.id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className=" h-screen w-screen bg-darkBlue">
      <div className="flex flex-col items-center justify-center h-[80%]">
        <div className="relative flex flex-col items-center justify-top w-[343px] h-[345px] md:w-[35.5rem] bg-darkGrayishBlue rounded-2xl">
          <p className=" text-neonGreen tracking-[.2em] text-sm mt-[2.9875rem] mb-[1.5rem] ">
            ADVICE #{id}
          </p>
          <h1 className="text-center text-lightCyan px-[1.75rem] text-[1.342rem]">
            {advice}
          </h1>
          <div>
            <img src={patternDesktop} alt="" className="mt-6" />
          </div>
          <div
            onClick={fetchQuote}
            className={`flex items-center justify-center w-16 h-16 bg-neonGreen rounded-full absolute bottom-[-30px] cursor-pointer md:hover:shadow md:hover:drop-shadow-glow duration-200 ${
              animate ? "translate-y-[-0.25rem]" : ""
            } md:translate-y-0`}
          >
            <div>
              <img src={diceLogo} alt="" className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
      <Credit />
    </section>
  );
};

export default App;
