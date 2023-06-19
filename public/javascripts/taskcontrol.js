function getRandomColor() {
    var arr = ['green', 'red', 'yellow', 'purple', 'brown', 'grey', 'pink', 'orange', 'aqua', 'darkgoldenrod'];
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

function setColor(evt, id) {
    let priority = getRandomColor()
    window.location.href = `http://localhost:3000/tasks/${id}/priority/${priority}`;
}
