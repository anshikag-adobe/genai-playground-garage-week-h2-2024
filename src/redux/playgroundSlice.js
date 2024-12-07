import {createSlice} from "@reduxjs/toolkit";

const initMsg = {
    text: 'Hi, I am Forms Gen-AI Playground. I can help you with your queries related to AEM.',
    isBot: true
}

const initialState = {
    llm_type: 'gpt-4o',
    tokens: 0,
    temperature: 0.0,
    query: '',
    messages: [initMsg],
    isLoading: false
};

const playgroundSlice = createSlice({
    name: 'playground',
    initialState,
    reducers: {
        setLLMType: (state, action) => {
            state.llm_type = action.payload;
        },
        setTokens: (state, action) => {
            state.tokens = action.payload;
        },
        setTemperature: (state, action) => {
            state.temperature = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [initMsg];
        },
        resetParameters: () => initialState,
    }
});

export const {
    setLLMType,
    setTokens,
    setTemperature,
    setQuery,
    resetParameters,
    addMessage,
    clearMessages,
    setLoading} = playgroundSlice.actions;
export default playgroundSlice.reducer;