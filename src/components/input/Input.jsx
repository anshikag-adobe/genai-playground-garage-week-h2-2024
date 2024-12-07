import './input.css';
import { HiMiniArrowTurnRightUp } from "react-icons/hi2";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, setLoading, setQuery} from "../../redux/playgroundSlice";
import Loader from "../loader/Loader.jsx";


const Input = () => {
    const dispatch = useDispatch();
    const {llm_type, tokens, temperature, query, isLoading} = useSelector(state => state.playground);

    const handleQueryChange = (e) => {
        dispatch(setQuery(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!query.trim()) return;

        dispatch(addMessage({ isBot: false, text: query }));
        dispatch(setQuery(''));
        dispatch(setLoading(true));

        try {
            const requestBody = {
                llm_type,
                tokens,
                temperature,
                query
            }

            console.log(requestBody);

            const response = await fetch('http://0.0.0.0:8080/adobe/ess/hackathon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });


            if(!response.ok) {
                throw new Error('Failed to fetch');
            }

            const result = await response.json();
            console.log(result)

            dispatch(addMessage({ isBot: true, text: result.response }));
        } catch (error) {
            console.error("Error submitting the API request: ", error.message);
            dispatch(addMessage({ isBot: true, text: 'Error fetching AI response. Please try again.' }));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <form className={"input-container"} onSubmit={handleSubmit}>
            {/*<Loader />*/}
            {isLoading ? <Loader/> : <input type="text" placeholder={"Type a message..."}
                                            value={query}
                                            onChange={handleQueryChange}/>}
            <button type={"submit"}><HiMiniArrowTurnRightUp/></button>
        </form>
    );
};

export default Input;