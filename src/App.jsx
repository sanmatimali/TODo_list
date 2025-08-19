import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    // Local Storage से todos load करें
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Todos को Local Storage में सेव करें जब भी वे बदलें
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
        },
      ]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-200 to-red-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          My To-Do List
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 rounded-r-md transition"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-400">No tasks, add some!</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {todos.map(({ id, text, completed }) => (
              <li
                key={id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded shadow-sm"
              >
                <div
                  onClick={() => toggleTodo(id)}
                  className={`flex-1 cursor-pointer select-none ${
                    completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                  title="Click to toggle complete"
                >
                  {text}
                </div>
                <button
                  onClick={() => deleteTodo(id)}
                  className="ml-4 text-red-100 hover:text-red-200 transition"
                  aria-label="Delete task"
                >
                  &#10005;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
// "मैंने React के function components और hooks useState और useEffect का उपयोग किया है। State में todos की लिस्ट रखता हूँ जो localStorage के साथ सिंक रहती है ताकि डेटा कायम रहे। addTodo, toggleTodo, और deleteTodo जैसे functions से यूज़र इंटरैक्शन को मैनेज करता हूँ। Tailwind CSS से UI स्टाइल किया है ताकि ऐप responsive और user-friendly दिखे।"
// useEffect का उपयोग हम इसलिए करते हैं ताकि जब भी todos state बदल जाए, तो हम updated टास्क लिस्ट को localStorage में सेव कर सकें।
