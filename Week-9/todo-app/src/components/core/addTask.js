import React from 'react'
import Input from '../form/input'
import Button from '../form/button'
function AddTask({ newTask, setNewTask, addNewTask }) {
    return (
        <>
            <div className='row'>
                <div className='col inputContainer'>
                    <Input
                        type="text"
                        cls="form-control form-control-lg"
                        value={newTask}
                        setValue={setNewTask}
                    />
                    <Button
                        handleEvent={addNewTask}
                        cls="btn btn-primary"
                        text="Add Task"
                    />

                </div>
            </div>
        </>
    )
}

export default AddTask