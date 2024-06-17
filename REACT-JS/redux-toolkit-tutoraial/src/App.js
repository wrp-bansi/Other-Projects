
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import {fetchTodos} from './redux/slice/todo'
// import { Counter } from './features/counter/Counter';

function App() {
  const dispatch=useDispatch()
  const staste=useSelector((staste)=>staste);
  console.log(staste)
  if(staste.todo.isLoading){
   return <h1>Loadinng...</h1>
  }
  return (
    <div className="App">
      {/* <Counter /> */}
      <button onClick={(e)=>dispatch(fetchTodos())}>featchtodo</button>
      {
        staste.todo.data&&staste.todo.data.map((e)=>(
          <li>{e.title}</li>
        ))
      }
    </div>
  );
}

export default App;
