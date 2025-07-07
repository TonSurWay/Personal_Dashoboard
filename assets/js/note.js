                const textarea = document.getElementById('noteInput');
                const preview = document.getElementById('preview');
                const savedNotesDiv = document.getElementById('savedNotes');

                let editingIndex = null;

                function parseMarkup(text) {
                    let html = text;

                    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
                    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
                    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
                    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
                    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
                    html = html.replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>');
                    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
                    html = html.replace(/\n{2,}/g, '</p><p>');
                    html = '<p>' + html + '</p>';

                    return html;
                }

                function renderPreview() {
                    const text = textarea.value;
                    const html = parseMarkup(text);
                    preview.innerHTML = html;

                    localStorage.setItem('lastNote', text);
                }

                function saveNote() {
                    const currentText = textarea.value.trim();
                    if (!currentText) {
                        alert('Note is empty!');
                        return;
                    }

                    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

                    const noteData = {
                        text: currentText,
                        timestamp: new Date().toLocaleString()
                    };

                    if (editingIndex !== null) {
                        savedNotes[editingIndex] = noteData;
                        editingIndex = null;
                        alert('Note updated!');
                    } else {
                        savedNotes.push(noteData);
                        alert('Note saved!');
                    }

                    localStorage.setItem('notes', JSON.stringify(savedNotes));
                    textarea.value = '';
                    renderPreview();
                    displaySavedNotes();
                }

                function clearNote() {
                    if (confirm('Are you sure to clear the note?')) {
                        textarea.value = '';
                        preview.innerHTML = '';
                        editingIndex = null;
                        localStorage.removeItem('lastNote');
                    }
                }

                function displaySavedNotes() {
                    const notes = JSON.parse(localStorage.getItem('notes')) || [];
                    savedNotesDiv.innerHTML = '';

                    notes.forEach((note, index) => {
                        const noteEl = document.createElement('div');
                        noteEl.className = 'note-item';

                        const timestamp = document.createElement('small');
                        timestamp.textContent = note.timestamp;

                        const content = document.createElement('div');
                        content.innerHTML = parseMarkup(note.text || '');


                        const actions = document.createElement('div');
                        actions.className = 'note-actions';

                        const editBtn = document.createElement('button');
                        editBtn.innerHTML = `<i class="bx bx-edit bx-sm"></i> Edit`;
                        editBtn.onclick = () => editNote(index);

                        const deleteBtn = document.createElement('button');
                        deleteBtn.innerHTML = `<i class="bx bx-trash bx-sm"></i> Delete`;
                        deleteBtn.className = 'delete-btn';
                        deleteBtn.onclick = () => deleteNote(index);

                        actions.appendChild(editBtn);
                        actions.appendChild(deleteBtn);

                        noteEl.appendChild(timestamp);
                        noteEl.appendChild(content);
                        noteEl.appendChild(actions);

                        savedNotesDiv.appendChild(noteEl);
                    });
                }

                function editNote(index) {
                    const notes = JSON.parse(localStorage.getItem('notes')) || [];
                    const note = notes[index];
                    textarea.value = note.text;
                    renderPreview();
                    editingIndex = index;
                }

                function deleteNote(index) {
                    if (confirm('Delete this note?')) {
                        const notes = JSON.parse(localStorage.getItem('notes')) || [];
                        notes.splice(index, 1);
                        localStorage.setItem('notes', JSON.stringify(notes));
                        displaySavedNotes();
                    }
                }

                textarea.addEventListener('input', renderPreview);

                window.onload = () => {
                    const last = localStorage.getItem('lastNote');
                    if (last) {
                        textarea.value = last;
                        renderPreview();
                    }
                    displaySavedNotes();
                };