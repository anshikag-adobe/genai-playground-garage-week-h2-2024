import './App.css'
import Chat from "./components/chat/Chat.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";

function App() {

  return (
    <div className={"app"}>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default App
