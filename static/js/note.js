// -----------------------add note interface---------------------------------------------------
const addnoteArea = document.getElementById('addnote');
const editnoteArea = document.getElementById('editnote');
const notearea = document.getElementById('notearea');
const noteContent = document.querySelectorAll('.noteContent');
const addnoteForm = document.getElementById('addnoteForm');
const editnoteForm = document.querySelectorAll('.editnote');
const cancleEditnote = document.querySelectorAll('.cancelEditnote');

addnoteArea.addEventListener('click', () => {
    addnoteForm.classList.toggle('show');
});

editnoteArea.addEventListener('click', () => {
    notearea.classList.toggle("edit-mode");
});


noteContent.forEach(i => {
    i.addEventListener('click', () => {
        if (!notearea.classList.contains('edit-mode')){
            return
        }
        noteContent.forEach(i =>{
            i.style.display = `list-item`
        })
        editnoteForm.forEach(i => {
            i.style.display = `none`
        })

        const form = i.nextElementSibling; 
        i.style.display = 'none';
        form.style.display = 'flex'; 
    });
});

cancleEditnote.forEach(i => {
    i.addEventListener('click', (e) => {
        e.preventDefault();  

        const form = i.closest('form'); 
        const li = form.previousElementSibling;  

        form.style.display = 'none';
        li.style.display = 'list-item'; 
    });
});





















