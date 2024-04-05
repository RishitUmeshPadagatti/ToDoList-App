import { useState, useEffect } from 'react'
import './App.css'
import editIcon from "./icons/edit.svg"
import removeIcon from "./icons/remove.svg"
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [todotext, setTodotext] = useState("")
    const [tododata, setTododata] = useState([])
    const [showfinished, setShowfinished] = useState(true)

    useEffect(() => {
        const LSdata = JSON.parse(localStorage.getItem("tododata"))
        if (LSdata !== null) {
            setTododata(LSdata)
        }
        else {
            setTododata([])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tododata", JSON.stringify(tododata))
    }, [tododata]);

    async function handleAdd() {
        if (todotext.trim() !== "") {
            await setTododata([...tododata, { id: uuidv4(), text: todotext, isCompleted: false }]);
            setTodotext("")
        }
    }

    function handleInput(e) {
        setTodotext(e.target.value)
    }

    function handleCheckboxChange(e) {
        let index = tododata.findIndex(item => {
            return item.id === e.target.name
        })
        let newArray = [...tododata]
        newArray[index].isCompleted = !newArray[index].isCompleted
        setTododata(newArray)
    }

    function handleEdit(id) {
        setTodotext(tododata.filter(i => i.id === id)[0].text)
        document.querySelector("#exception1").focus()
        setTododata(tododata.filter(item => {
            return item.id != id
        }))
    }

    function handleDelete(id) {
        setTododata(tododata.filter(item => {
            return item.id != id
        }))
    }

    function handleFinishedView() {
        setShowfinished(!showfinished)
    }

    return (
        <div className='animated-background min-h-[100vh] flex justify-center md:items-center md:p-[50px] md:text-[16px] text-[10px]'>
            {/* Container */}
            <div className="container md:rounded-[16px] md:min-h-[80vh] md:min-w-[80vw] flex items-center flex-col md:p-10 p-5">
                {/* Upper */}
                <div className='w-full flex gap-[10px] flex-col md:flex-row'>
                    <input className='md:w-[95%]  rounded-[10px] px-5 py-3' type="text" name="" id="exception1" placeholder='Add a todo' value={todotext} onChange={handleInput} onKeyDown={(event) => { if (event.key === 'Enter') { handleAdd() } }} />
                    <button className='background2 border rounded-[10px]  cursor-pointer px-5 py-3' onClick={handleAdd} disabled={todotext.trim() === ""}>Save</button>
                </div>

                {/* Line */}
                <div className="w-full border border-[#FFFFFF4D] mt-10"></div>

                {/* Lower */}
                <button onClick={handleFinishedView} className='background2 border rounded-[10px] px-5 py-3 my-4'>{showfinished === true ? "Hide Finished" : "Show Finished"}</button>
                {tododata.map(item => {
                    return ((item.isCompleted == false || showfinished == true) && <div key={item.id} className='background1 border border-[#FFFFFF4D] flex items-center justify-between w-full px-5 py-4 rounded-[10px] my-2'>

                        <label className='flex gap-3'>
                            <input onChange={handleCheckboxChange} type="checkbox" name={item.id} id="" checked={item.isCompleted} />
                            <div className={item.isCompleted ? "line-through" : ""}>{item.text}</div>
                        </label>
                        <div className="flex gap-3">
                            <img onClick={() => handleEdit(item.id)} src={editIcon} alt="Edit" className='hover:scale-110 w-7 cursor-pointer' />
                            <img onClick={() => handleDelete(item.id)} src={removeIcon} alt="Remove" className='hover:scale-110 w-7 cursor-pointer ' />
                        </div>
                    </div>)
                })}

            </div>
        </div>
    )
}

export default App