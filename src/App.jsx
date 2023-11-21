import usePasswordGenerator from "../hooks/usePasswordGenerator";
import { Switch } from "@material-tailwind/react";
import { useCallback, useEffect, useRef } from "react";
import { FaKey, FaClipboard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    length,
    setLength,
    numberAllowed,
    setNumberAllowed,
    charAllowed,
    setCharAllowed,
    password,
    generatePassword,
  } = usePasswordGenerator();

  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 24);
    window.navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-grey-700">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <h1 className="flex items-center justify-center text-[#b2e600] my-3 font-semibold text-lg">
          PassWord Generator <FaKey className="ml-2" />
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-9"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
        </div>
        <div className="flex flex-col text-sm gap-y-2 text-white space-y-2 justify-center items-center">
          <div className="flex items-center gap-x-16">
            <label htmlFor="numberInput">Include Numbers</label>
            <Switch
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="h-full w-full checked:bg-[#b2e600]"
              containerProps={{
                className: "w-11 h-6",
              }}
              circleProps={{
                className: "before:hidden left-0.5 border-none",
              }}
            />
          </div>

          <div className="flex items-center gap-x-16">
            <label htmlFor="characterInput">Include Symbols</label>
            <Switch
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="h-full w-full checked:bg-[#b2e600]"
              containerProps={{
                className: "w-11 h-6",
              }}
              circleProps={{
                className: "before:hidden left-0.5 border-none",
              }}
            />
          </div>
          <div className="flex items-center gap-x-10 mb-2">
            <label>Password Length: {length}</label>
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              className="cursor-pointer accent-[#b2e600] "
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <button
          className="flex items-center justify-center mt-6 w-full h-10 max-w-md mx-auto outline-none shadow-md rounded-lg bg-[#b2e600] text-black font-semibold text-lg px-3 py-0.5 transition-all duration-300 hover:bg-[#8bcc00]"
          onClick={copyPasswordToClipBoard}
        >
          Copy to Clipboard <FaClipboard className="ml-2" />
        </button>

        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default App;
