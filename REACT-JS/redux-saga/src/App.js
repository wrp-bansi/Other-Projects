import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchTodoPending } from "./redux/slice/FeatchDataSlice";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const handleFetchTodo = () => {
    dispatch(featchTodoPending());
  };

  if (selector.todo.isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="App">
      <>
        <button onClick={handleFetchTodo}>Featch Todo</button>
        {selector.todo.data &&
          selector.todo.data.map((e) => (
            <li key={e.id}>{e.title}</li>
          ))}
      </>
    </div>
  );
}

export default App;
