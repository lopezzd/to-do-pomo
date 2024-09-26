import { useState, FormEvent, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isWork, setIsWork] = useState<boolean>(true);

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const task = formData.get('task') as string;

    if (task) {
      setTasks((prevState) => [...prevState, task]);
    }
  }

  const toggleTimer = () => {
    setIsActive(!isActive);
  }

  const restartTimer = () => {
    setIsActive(false);
    setMinutes(isWork ? 25 : 5);
    setSeconds(0);
  }

  useEffect(() => {
    let interval: any = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsWork(!isWork);
            setMinutes(isWork ? 5 : 25);
            setSeconds(0);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1)
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    }
  }, [isActive, seconds, minutes, isWork]);

  return (
    <div
      className="rounded-sm sm:min-w-[50vw] bg-white px-6 py-5 font-black uppercase">
      <section
        className="grid place-items-center p-2 w-full">
        <div
          className="font-bold text-8xl ">
          <span
            id="Minutes"
            className="mx-4">
            {String(minutes).padStart(2, "0")}
          </span>

          <span
            className="mx-4">
            :
          </span>

          <span
            id="Seconds"
            className="mx-4">
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
        <nav
          className="w-full flex gap-2">

          <button
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-2 px-4 rounded-sm mt-4 hover:bg-emerald-600 hover:to-green-600 transition ease-in-out duration-500 uppercase w-full disabled:to-gray-300 disabled:from-neutral-300"
            onClick={toggleTimer}
            disabled={isActive}>Start</button>

          <button
            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-sm mt-4 hover:bg-yellow-600 hover:to-amber-600 transition ease-in-out duration-500 uppercase w-full disabled:to-neutral-300 disabled:from-gray-300"
            onClick={toggleTimer}
            disabled={!isActive}>Pausar</button>

          <button
            className="bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold py-2 px-4 rounded-sm mt-4 hover:bg-rose-600 hover:to-red-600 transition ease-in-out duration-500 uppercase w-full disabled:to-gray-300 disabled:from-neutral-300"
            onClick={restartTimer}
            disabled={minutes === 25 && seconds === 0}>Restart</button>

        </nav>
      </section>

      <hr
        className="h-px w-full my-4 hidden sm:block" />

      <h1
        className="w-full text-center">
        Add Task
      </h1>

      <form
        onSubmit={handleAddTask}
        className="w-full flex flex-col sm:flex-row sm:items-center gap-2 p-2">
        <input
          type="text"
          name="task"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm p-2 w-full" />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-sky-500 hover:bg-sky-600 hover:to-blue-600 transition ease-in-out duration-150 rounded-sm text-sm p-2 text-center text-white font-bold w-full sm:w-1/2 uppercase">Add task</button>
      </form>

      <article >
        <ul
          className="flex flex-col items-center gap-3 p-2 overflow-auto h-[40vh] no-scrollbar">
          {tasks.map((item, index) => (
            <li
              className="rounded-sm w-full py-2 px-3 bg-gradient-to-r from-gray-300 to-neutral-300 text-gray-700 text-center"
              key={index}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default App;
