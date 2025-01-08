// export default ContextProvider;
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const delayPara = (index, nextWord, setResultData) => {
    setTimeout(() => {
        setResultData(prev => prev + nextWord);
    }, 75 * index);
};

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
             if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
    } else {
        newResponse += "<br><b>" + responseArray[i] + "</b><br>";
    }
}
        let newResponse2 = newResponse.split(/(\*\.)/).map((part, index) => {
        if (part === "*.") {
            return "<br>";
    }
        return part;
}).join("");

        let newResponse3 = newResponse2.split("```").join("<br>");
        let newResponse4 = newResponse3.split(";").map(part => part + ";<br>").join("");
        let newResponse5 = newResponse4.split("`").map(part => part + "`<br>").join("");
        let newResponseArray = newResponse5.split(" ");

        for (let i = 0; i < newResponseArray.length; i++) {
         const nextWord = newResponseArray[i];
         delayPara(i, nextWord + " ", setResultData);

}

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
