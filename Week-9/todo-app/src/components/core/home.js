import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AddTask from './addTask';
import UpdateTask from './updateTask';
function Home() {
    const [todo, setTodo] = useState([])
    const [newTask, setNewTask] = useState('');
    const [updateTask, setUpdateTask] = useState('');
    const [updateData, setUpdateData] = useState({});
    const addNewTask = () => {
        if (newTask) {
            const id = todo.length + 1
            let newTaskItem = {
                id: id,
                title: newTask,
                status: false
            }
            setTodo([...todo, newTaskItem])
            setNewTask('')
        }
    }
    const updateNewTask = () => {
        if (updateData && !updateData.status) {
            updateData.title = updateTask;
            let to_do = [...todo].filter((x) => {
                return x.id !== updateData.id ? x : null
            })
            console.log(to_do)
            let newList = [...to_do, updateData]
            setTodo(newList)
            setUpdateData({})
            setUpdateTask('')
        }
    }
    const markComplete = (task) => {
        if (!task.status) {
            let to_do = [...todo].filter((x) => {
                return x.id !== task.id ? x : null
            })
            task.status = true
            console.log(to_do)
            let newList = [...to_do, task]
            setTodo(newList)
        }
    }
    const deleteTask = (task) => {
        if (!task.status) {
            let to_do = [...todo].filter((x) => {
                return x.id !== task.id ? x : null
            })

            let newList = [...to_do]
            setTodo(newList)
        }
    }
    const revertChanges = () => {
        setUpdateData({})
        setUpdateTask('')
    }
    const toggleEditButtons = (id) => {
        console.log(id)
        const task = todo.filter((x) => {
            return x.id === id ? x : "";
        });
        console.log(task[0].title)
        setUpdateTask(task[0].title)
        setUpdateData(task[0])
    }
    return (
        <>

            {updateTask ? <UpdateTask
                updateTask={updateTask}
                setUpdateTask={setUpdateTask}
                updateNewTask={updateNewTask}
                revertChanges={revertChanges} />
                :
                <AddTask newTask={newTask}
                    setNewTask={setNewTask}
                    addNewTask={addNewTask} />

            }

            {todo && todo.length > 0 ? '' : <h5>Add tasks ...</h5>}
            <div className='row taskbg'>
                {
                    todo && todo.sort((a, b) => a.id > b.id ? 1 : -1).map((task, index) => {
                        return (
                            <>

                                <div className='task'>
                                    <div className={task.status ? 'done' : 'inProgress'}>
                                        <span className='taskNumber'>{index + 1}</span>
                                        <span className='taskText'>{task.title}</span>

                                    </div>
                                    <div className='iconsWrapper'>
                                        <span className={task.status ? 'completed' : 'inprogress'} onClick={(e) => markComplete(task)}>
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </span>
                                        <span className={task.status ? 'hidden' : 'editTask'} >
                                            <FontAwesomeIcon icon={faPen} onClick={(e) => toggleEditButtons(task.id)} />
                                        </span>
                                        <span className={task.status ? 'hidden' : 'deleteTask'} onClick={(e) => deleteTask(task)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>

        </>

    )
}

export default Home