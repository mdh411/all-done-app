import React from 'react';

function Task({ task }) {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status ? 'Done' : 'Not Done'}</p>
        </div>
    );
}

export default Task;
