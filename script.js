

    var addBtn = document.getElementById('addNotesBtn');

    const addNotes = () => {

        var time = new Date();

        var seconds = time.getSeconds();

        var minutes = time.getMinutes();

        var hours = time.getHours();

        var date = time.getDate();

        var weekArray = new Array(7);

        weekArray[0] = 'Sunday';
        weekArray[1] = 'Monday';
        weekArray[2] = 'Tuesday';
        weekArray[3] = 'Wednesday';
        weekArray[4] = 'Thursday';
        weekArray[5] = 'Friday';
        weekArray[6] = 'Saturday';

        var day = weekArray[time.getDay()]

        var monthArray = new Array(12);

        monthArray[0] = 'Junuary';
        monthArray[1] = 'Febuaury';
        monthArray[2] = 'March';
        monthArray[3] = 'April';
        monthArray[4] = 'May';
        monthArray[5] = 'June';
        monthArray[6] = 'July';
        monthArray[7] = 'August';
        monthArray[8] = 'September';
        monthArray[9] = 'October';
        monthArray[10] = 'November';
        monthArray[11] = 'December';

        var month = monthArray[time.getMonth()];

        var year = time.getFullYear();

        var addNotesTxt = document.getElementById('addNotesTxt');

        var notesOutput = addNotesTxt.value;

        let notesObj = { notesOutput, seconds, minutes, hours, date, day, month, year }

        let insertData = JSON.parse(localStorage.getItem('notes'));

        if (!insertData) {
            localStorage.setItem('notes', JSON.stringify([notesObj]));
        }
        else {
            insertData.push(notesObj);
            localStorage.setItem('notes', JSON.stringify(insertData));
        }

        window.location.reload();

    };

    addBtn.addEventListener('click', addNotes);

    let notesContainer = document.getElementsByClassName('notesContainer')[0];

    let getDataFormLocalStorage = JSON.parse(localStorage.getItem('notes'));

    if (!getDataFormLocalStorage) {
        alert('Please add some notes for the first time...')
    }
    else {
        getDataFormLocalStorage.map((obj, i, arrayObject) => {

            let stickyImage = document.createElement('div');
            stickyImage.className = 'stickyImg';
            notesContainer.appendChild(stickyImage);

            let editingDeletingDiv = document.createElement('div')
            editingDeletingDiv.className = 'editDeleteDiv'
            stickyImage.appendChild(editingDeletingDiv);

            let editTxt = document.createElement('input');
            editTxt.className = 'editTxt';
            editTxt.style.visibility = 'hidden'
            editingDeletingDiv.appendChild(editTxt)

            let saveBtn = document.createElement('button');
            saveBtn.className = 'saveBtn'
            saveBtn.innerText = 'Save'
            saveBtn.style.visibility = 'hidden'
            editingDeletingDiv.appendChild(saveBtn)

            let deleteDiv = document.createElement('div')
            deleteDiv.className = 'deleteImg'
            editingDeletingDiv.appendChild(deleteDiv)

            let deleteI = document.createElement('i')
            deleteI.className = 'far fa-trash-alt'
            deleteDiv.appendChild(deleteI)

            deleteI.onclick = deleteObject => {
                getDataFormLocalStorage.splice(i, 1)
                localStorage.setItem('notes', JSON.stringify(getDataFormLocalStorage));
                window.location.reload()
            }

            let editDiv = document.createElement('div')
            editDiv.className = 'editImg'
            editingDeletingDiv.appendChild(editDiv)

            let editI = document.createElement('i')
            editI.className = 'far fa-edit'
            editDiv.appendChild(editI)

            editI.onclick = editObject => {
                editTxt.style.visibility = 'visible'
                saveBtn.style.visibility = 'visible'
                editTxt.value = obj.notesOutput
            }

            saveBtn.onclick = saveData => {
                var editDataS = editTxt.value

                arrayObject[i].notesOutput = editDataS;
                localStorage.setItem('notes', JSON.stringify(arrayObject))
                window.location.reload();
            }

            let notesHeading = document.createElement('h1');
            notesHeading.className = 'heading1';
            notesHeading.innerText = 'Sticky Notes'
            stickyImage.appendChild(notesHeading);

            let datePara = document.createElement('p');
            datePara.className = 'datePara';
            datePara.innerText = obj.day + ', ' + obj.date + " " + obj.month + ', ' + obj.year;
            stickyImage.appendChild(datePara);

            let timePara = document.createElement('p');
            timePara.className = 'timePara';
            timePara.innerText = obj.hours + ' : ' + obj.minutes + ' : ' + obj.seconds;
            stickyImage.appendChild(timePara);

            let notesPara = document.createElement('p');
            notesPara.className = 'paragraph1';
            notesPara.innerText = "-> " + obj.notesOutput;
            stickyImage.appendChild(notesPara);
        })
    }

