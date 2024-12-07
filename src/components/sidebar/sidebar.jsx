import './sidebar.css'
import { LuCornerLeftDown } from "react-icons/lu";
import { BsChatLeftTextFill } from "react-icons/bs";
import { IoCodeWorking } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { llmList, colors } from "../../constants.js";
import { setLLMType, setTokens, setTemperature } from "../../redux/playgroundSlice.js";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { llm_type, tokens, temperature } = useSelector((state) => state.playground);

    const handleParameterChange = (type, value) => {
        switch (type) {
            case 'llm_type':
                dispatch(setLLMType(value));
                break;
            case 'tokens':
                dispatch(setTokens(Number(value)));
                break;
            case 'temperature':
                dispatch(setTemperature(parseFloat(value)));
                break;
            default:
                break;
        }
    };

    return (
        <div className={"sidebar"}>
            <div className={"sidebar-header"}>
                <div className={"sidebar-header-title"}>Gen-AI Playground</div>
            </div>
            <div className={"sidebar-content"}>
                <div className={"sidebar-group"}>
                    <div className={"sidebar-group-title"}>
                        <LuCornerLeftDown />LLM List
                    </div>
                    <div className={"sidebar-group-list"}>
                        {llmList.map((llm, index) => {
                            return (
                                <div key={index} className={`sidebar-group-item ${llm_type === llm.value ? 'selected' : ''}`}
                                     onClick={() => handleParameterChange('llm_type', llm.value)}
                                     style={llm_type === llm.value ? {background: `linear-gradient(90deg, var(--${colors[index]}-backdrop) 0%, var(--grey-backdrop) 30%)`} : {}}>
                                    <span className={"sidebar-group-item__tag"} style={{background: `var(--${colors[index]})`}} /> {llm.displayText}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={"sidebar-group"}>
                    <div className={"sidebar-group-title"}>
                        <IoCodeWorking />Hyperparameters
                    </div>
                    <div className={"sidebar-group-list"}>
                        <div className={"input-group"}>
                            <label htmlFor={"tokens"}>Tokens</label>
                            <input type={"number"} id={"tokens"} placeholder={"No. of Tokens"} value={tokens} onChange={(e) => handleParameterChange('tokens', e.target.value)}/>
                        </div>

                        <div className={"input-group"}>
                            <label htmlFor={"temperature"}>Temperature</label>
                            <input type={"number"} step="0.1" id={"temperature"} placeholder={"Temperature"} value={temperature} onChange={(e) => handleParameterChange('temperature', e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;