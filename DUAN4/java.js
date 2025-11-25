// Khởi tạo dữ liệu
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let selectedIndex = null;
const notesList = document.getElementById("notesList");
const addNoteBtn = document.getElementById("addNoteBtn");
const searchInput = document.getElementById("searchInput");
// Hiển thị danh sách ghi chú
function renderNotes(filteredNotes = null) {
    notesList.innerHTML = "";
    let displayNotes = filteredNotes || notes;
    displayNotes.forEach((n, i) => {
        let li = document.createElement("li");
        li.textContent = n.title;
        li.onclick = () => selectNote(i);
        notesList.appendChild(li);
    });
}
// Chọn ghi chú
function selectNote(i) {
    selectedIndex = i;
    let note = notes[i];

    document.getElementById("noteTitle").textContent = note.title;
    document.getElementById("noteContent").textContent = note.content;
    document.getElementById("noteTime").textContent = note.time;
}
// Tạo ghi chú mới
addNoteBtn.onclick = function() {
    let title = prompt("Tiêu đề ghi chú:");
    let content = prompt("Nội dung:");

    if (!title) return;

    notes.push({
        title,
        content,
        time: new Date().toLocaleString("vi-VN")
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
};

// Sửa ghi chú
document.getElementById("edit").onclick = function() {
    if (selectedIndex === null) return;

    let note = notes[selectedIndex];
    let newTitle = prompt("Chỉnh sửa tiêu đề:", note.title);
    let newContent = prompt("Chỉnh sửa nội dung:", note.content);

    if (!newTitle) return;

    note.title = newTitle;
    note.content = newContent;
    note.time = new Date().toLocaleString("vi-VN");

    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    selectNote(selectedIndex);
};
// Xóa ghi chú
document.getElementById("delete").onclick = function() {
    if (selectedIndex === null) return;

    if (confirm("Bạn có chắc muốn xóa?")) {
        notes.splice(selectedIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();

        document.getElementById("noteTitle").textContent = "Chưa chọn ghi chú";
        document.getElementById("noteContent").textContent = "";
        document.getElementById("noteTime").textContent = "";
        selectedIndex = null;
    }
};
// Tìm kiếm
searchInput.oninput = function() {
    let key = searchInput.value.toLowerCase();
    let filtered = notes.filter(n => n.title.toLowerCase().includes(key));

    renderNotes(filtered);
};

// Ban đầu hiển thị danh sách
renderNotes();
