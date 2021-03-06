const showButton = document.querySelector(`.show_button`);

const addNewTask = document.querySelector(`.add_new_task`)
const modalBlock = document.querySelector(`.modal_block`)
const modalButtonCancel = document.querySelector(`.modal_button_cancel`)
const modalButtonSave = document.querySelector(`.modal_button_save`)

const modalName = document.querySelector(`.modal_name`)
const modalDescription = document.querySelector(`.modal_description`)

// SHOW BUTTON CREATE TABLE

showButton.addEventListener(`click`, () => {
    createTable()
})

// MODAL WINDOW APPEARS AND DISAPPEARS (WITHOUT SAVING)

addNewTask.addEventListener(`click`, () => {
    modalBlock.style.display = `block`;
    addNewTask.style.display = `none`;
})

modalButtonCancel.addEventListener(`click`, () => {
    modalBlock.style.display = `none`;
    addNewTask.style.display = `block`;

    modalName.value = ``;
    modalDescription.value = ``;
})

// MODAL WINDOW SAVE NEW TASK

modalButtonSave.addEventListener(`click`, () => {

    const newTaskObject = {};

    newTaskObject.id = lsDataOut.length;
    newTaskObject.name = modalName.value;
    newTaskObject.description = modalDescription.value;

    const radioUrgent = document.querySelector(`#radio_urgent`);
    const radioNotUrgent = document.querySelector(`#radio_not_urgent`);
    const radioTermless = document.querySelector(`#radio_termless`);

    if (radioUrgent.checked) {
        newTaskObject.urgency = 0;
    }
    if (radioNotUrgent.checked) {
        newTaskObject.urgency = 1;
    }
    if (radioTermless.checked) {
        newTaskObject.urgency = 2;
    }

    newTaskObject.completed = false;
    newTaskObject.deleted = false;

    lsDataOut.push(newTaskObject);

    updateLocalStorage ();

    createTable();

    modalName.value = ``;
    modalDescription.value = ``;

    modalBlock.style.display = `none`;
    addNewTask.style.display = `block`;
})





