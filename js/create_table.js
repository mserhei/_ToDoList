const mainTable = document.querySelector(`.main_table`);

const createTable = function () {

    if (document.querySelector(`table`)) {
        document.querySelector(`table`).remove()
    }

    //  CREATE TASKS ARRAY, WHEN CONDITIONS ARE CHECKED

    let allTasksRadio = document.querySelectorAll(`.all_tasks_radio`);
    let allTasksRadioCheckedIndex;

    for (let i = 0; i < allTasksRadio.length; i++) {
        if (allTasksRadio[i].checked) {
            allTasksRadioCheckedIndex = i;
        }
    }

    let allUrgentRadio = document.querySelectorAll(`.all_urgency_radio`);
    let allUrgentRadioCheckedIndex;

    for (let i = 0; i < allUrgentRadio.length; i++) {
        if (allUrgentRadio[i].checked) {
            allUrgentRadioCheckedIndex = i;
        }
    }

    let arrAfterTasksChecked = [];

    for (let i = 0; i < lsDataOut.length; i++) {
        if (allTasksRadioCheckedIndex === 0) {
            arrAfterTasksChecked = lsDataOut;
        }
        if (allTasksRadioCheckedIndex === 1) {
            if (lsDataOut[i].completed === false) {
                arrAfterTasksChecked.push(lsDataOut[i]);
            }
        }
        if (allTasksRadioCheckedIndex === 2) {
            if (lsDataOut[i].completed === true) {
                arrAfterTasksChecked.push(lsDataOut[i]);
            }
        }
        if (allTasksRadioCheckedIndex === 3) {
            if (lsDataOut[i].deleted === true) {
                arrAfterTasksChecked.push(lsDataOut[i]);
            }
        }
    }

    let arrAfterUrgencyChecked = [];

    for (let i = 0; i < arrAfterTasksChecked.length; i++) {
        if (allUrgentRadioCheckedIndex === 0) {
            arrAfterUrgencyChecked = arrAfterTasksChecked;
        }
        if (allUrgentRadioCheckedIndex === 1) {
            if (arrAfterTasksChecked[i].urgency === 0) {
                arrAfterUrgencyChecked.push(arrAfterTasksChecked[i]);
            }
        }
        if (allUrgentRadioCheckedIndex === 2) {
            if (arrAfterTasksChecked[i].urgency === 1) {
                arrAfterUrgencyChecked.push(arrAfterTasksChecked[i]);
            }
        }
        if (allUrgentRadioCheckedIndex === 3) {
            if (arrAfterTasksChecked[i].urgency === 2) {
                arrAfterUrgencyChecked.push(arrAfterTasksChecked[i]);
            }
        }
    }

    // CREATE A TABLE

    const tableTag = document.createElement('table');
    mainTable.append(tableTag);

    for (let i = 0; i < arrAfterUrgencyChecked.length; i++) {
        let trTag = document.createElement(`tr`);
        tableTag.append(trTag);

        // URGENCY

        let tdTagUrgency = document.createElement(`td`);
        if (arrAfterUrgencyChecked[i].urgency === 0) {
            tdTagUrgency.classList.add(`td_urgency`, `td_urgent`, 'td_center');
            tdTagUrgency.innerText = `urgent`;
        } else if (arrAfterUrgencyChecked[i].urgency === 1) {
            tdTagUrgency.classList.add(`td_urgency`, `td_not_urgent`, 'td_center');
            tdTagUrgency.innerText = `not urgent`;
        } else {
            tdTagUrgency.classList.add(`td_urgency`, `td_termless`, 'td_center');
            tdTagUrgency.innerText = `termless`;
        }

        trTag.append(tdTagUrgency);

        // NAME

        let tdTagName = document.createElement(`td`);
        tdTagName.classList.add(`td_name`);
        tdTagName.innerText = `${arrAfterUrgencyChecked[i].name}`;
        trTag.append(tdTagName);

        // COMPLETED

        let tdTagCompleted = document.createElement(`td`);
        if (arrAfterUrgencyChecked[i].completed === true) {
            tdTagCompleted.classList.add(`td_completed`, `green`, 'td_center');

        } else {
            tdTagCompleted.classList.add(`td_completed`, `silver`, 'td_center');
        }

        tdTagCompleted.innerText = `completed`;
        trTag.append(tdTagCompleted);

        // DELETED

        let tdTagDeleted = document.createElement(`td`);

        if (arrAfterUrgencyChecked[i].deleted === true) {
            tdTagDeleted.classList.add(`td_deleted`, `red`, 'td_center');

        } else {
            tdTagDeleted.classList.add(`td_deleted`, `silver`, 'td_center');
        }

        tdTagDeleted.innerText = `deleted`;
        trTag.append(tdTagDeleted);

        // DESCRIPTION

        let tdTagDescription = document.createElement(`td`);
        if (arrAfterUrgencyChecked[i].description) {
            tdTagDescription.classList.add(`black-silver`, 'td_center', 'td_description');
            tdTagDescription.innerText = `description`;
            trTag.append(tdTagDescription);
        } else {
            tdTagDescription.classList.add(`silver`, 'td_center', 'td_description');
            tdTagDescription.innerText = `description`;
            trTag.append(tdTagDescription);
        }
    }

    // ON COMPLETED CLICK

    const allTdCompleted = document.querySelectorAll(`.td_completed`);

    for (let i = 0; i < allTdCompleted.length; i++) {
        allTdCompleted[i].addEventListener(`click`, () => {
            allTdCompleted[i].classList.toggle(`green`);
            allTdCompleted[i].classList.toggle(`silver`);

            if (arrAfterUrgencyChecked[i].completed === true) {
                lsDataOut[arrAfterUrgencyChecked[i].id].completed = false

            } else {
                lsDataOut[arrAfterUrgencyChecked[i].id].completed = true
            }

            createTable();
        })
    }

    // ON DELETED CLICK

    const allTdDeleted = document.querySelectorAll(`.td_deleted`);

    for (let i = 0; i < allTdDeleted.length; i++) {
        allTdDeleted[i].addEventListener(`click`, () => {
            allTdDeleted[i].classList.toggle(`red`);
            allTdDeleted[i].classList.toggle(`silver`);

            if (arrAfterUrgencyChecked[i].deleted === true) {
                lsDataOut[arrAfterUrgencyChecked[i].id].deleted = false
            } else {
                lsDataOut[arrAfterUrgencyChecked[i].id].deleted = true
            }

            createTable();
        })
    }

    // ON DESCRIPTION CLICK

    const allTdDescriprion = document.querySelectorAll(`.td_description`);

    for (let i = 0; i < allTdDescriprion.length; i++) {

        allTdDescriprion[i].addEventListener(`click`, () => {

            if (!document.querySelector(`.tr_insert_description`)) {
                const trRowBaseDescription = allTdDescriprion[i].parentElement;

                const trRowInsertDescription = document.createElement('tr');
                trRowInsertDescription.classList.add(`tr_insert_description`)
                trRowBaseDescription.after(trRowInsertDescription);

                trRowInsertDescription.innerHTML = 
                `<td colspan="5">
                    <div class="div_insert_description">
                        <input class="input_insert_description" type="textarea" placeholder="insert description here">
                        <button class="button_insert_description button_cancel_insert_description">cancel</button>
                        <button class="button_insert_description button_save_insert_description">save</button>
                    </div>
                </td>`;

                let textInsertDescription = document.querySelector(`.input_insert_description`);
                textInsertDescription.value = lsDataOut[arrAfterUrgencyChecked[i].id].description;

                const buttonCancelInsertDescription = document.querySelector(`.button_cancel_insert_description`);
                buttonCancelInsertDescription.addEventListener(`click`, () => {
                    trRowInsertDescription.remove();
                })

                const buttonSaveInsertDescription = document.querySelector(`.button_save_insert_description`);
                buttonSaveInsertDescription.addEventListener(`click`, () => {
                    trRowInsertDescription.remove();

                    lsDataOut[arrAfterUrgencyChecked[i].id].description = textInsertDescription.value;

                    createTable();
                })
            }
        })
    }
}

createTable();