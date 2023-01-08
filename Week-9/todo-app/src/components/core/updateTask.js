import React from 'react'
import Input from '../form/input'
import Button from '../form/button'
function UpdateTask({ updateTask, setUpdateTask, updateNewTask, revertChanges }) {
    return (
        <>
            <div className='row'>
                <div className='col inputContainer'>
                    <Input
                        type="text"
                        cls="form-control form-control-lg"
                        value={updateTask}
                        setValue={setUpdateTask}
                    />
                </div>
                <div className='buttons'>
                    <Button
                        handleEvent={updateNewTask}
                        cls="btn btn-primary me-2"
                        text="Update"
                    />
                    <Button
                        handleEvent={revertChanges}
                        cls="btn btn-warning"
                        text="Cancel"
                    />
                </div>
            </div>
        </>
    )
}

export default UpdateTask