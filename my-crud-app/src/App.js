import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteList from "./NoteList";

function App() {
  return (
    <div className="container mt-3">
      <h1>React + Spring Boot CRUD </h1>
      <NoteList />
    </div>
  );
}

export default App;
