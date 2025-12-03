 /* ------------------- DARK MODE ------------------- */
        const darkBtn = document.getElementById("dark");
        const lightBtn = document.getElementById("light");
        darkBtn.onclick = () => document.body.classList.add("dark-mode");
        lightBtn.onclick = () => document.body.classList.remove("dark-mode");


        /* ------------------- TO-DO LIST ------------------- */
        const NLI = document.getElementById("NLI");
        const Add = document.getElementById("Add");
        const Ccont = document.getElementById("Ccont");

        function saveTasks() {
            localStorage.setItem("tasks", Ccont.innerHTML);
        }

        function loadTasks() {
            Ccont.innerHTML = localStorage.getItem("tasks") || "";
        }
        loadTasks();

        Add.onclick = (e) => {
            if (NLI.value.trim() === "") return;

            const div = document.createElement("div");
            div.innerHTML = `<input type='checkbox'> <span>${NLI.value}</span>`;

            Ccont.appendChild(div);
            NLI.value = "";
            saveTasks();
        };

        document.getElementById("SA").onclick = () => {
            Ccont.querySelectorAll("input").forEach(c => c.checked = true);
        };
        document.getElementById("UA").onclick = () => {
            Ccont.querySelectorAll("input").forEach(c => c.checked = false);
        };
        document.getElementById("RS").onclick = () => {
            Ccont.querySelectorAll("input:checked").forEach(x => x.parentElement.remove());
            saveTasks();
        };

        Ccont.addEventListener("change", saveTasks);


        /* ------------------- POMODORO ------------------- */
        let timeLeft = 1500; //25 mins
        let interval;
        const timeText = document.getElementById("time"); 

        function updateTimer() {
            let m = Math.floor(timeLeft/60);
            let s = timeLeft % 60;
            timeText.textContent = `${m}:${s.toString().padStart(2,"0")}`;
        }

        document.getElementById("startBtn").onclick = () => {
            clearInterval(interval);
            interval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                }
            }, 1000);
        };

        document.getElementById("pauseBtn").onclick = () => clearInterval(interval);

        document.getElementById("resetBtn").onclick = () => {
            timeLeft = 1500;
            updateTimer();
            clearInterval(interval);
        };


        /* ------------------- NOTES ------------------- */
        const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const addNote = document.getElementById("noteADD");
const noteInput = document.getElementById("noteInput");
const Mbody = document.querySelector(".Mbody");


openModalButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active')
}
let notesTable = JSON.parse(localStorage.getItem("notes")) || [];
loadNotes();
addNote.addEventListener("click",()=>{
    let tInput = noteInput.value.trim();
    if(tInput === ""){
        alert("please write a note before adding it");
    }else{
        notesTable.push(noteInput.value);
        noteInput.value = "";
        localStorage.setItem("notes", JSON.stringify(notesTable));
        loadNotes();
    }
    })



    function loadNotes(){
        Mbody.innerHTML = "";
        notesTable.forEach((n, index) => {
            let newNote = document.createElement("div");
            newNote.classList.add("ONENote");
            newNote.innerHTML = `<p>${n}</p><button class="removeBTNnotes">&times;</button>`;
            const removeBtn = newNote.querySelector(".removeBTNnotes");
        removeBtn.addEventListener("click", () => {
            // Remove from array
            notesTable.splice(index, 1);

            // Update localStorage
            localStorage.setItem("notes", JSON.stringify(notesTable));

            // Re-render notes
            loadNotes();
        });
            Mbody.appendChild(newNote);
        })
    }


    /* ------------------- QUOTES ------------------- */
        const quotes = [
  "Small steps every day.",
  "Discipline beats motivation.",
  "Focus on progress, not perfection.",
  "One hour a day = mastery.",
  "Do it for your future self.",
  "Consistency is a cheat code.",
  "You won't always be motivated. Be disciplined.",
  "Future you is watching.",
  "Excuses change nothing. Actions change everything.",
  "You're closer than you think.",
  "Hard choices, easy life. Easy choices, hard life.",
  "Be obsessed with improvement.",
  "Fall in love with the grind.",
  "Comfort kills dreams.",
  "Be so good they can't ignore you.",
  "Small wins compound.",
  "Start now. Not later.",
  "If it's important, you'll find a way.",
  "Don't negotiate with weakness.",
  "Every day is a chance to get better.",
  "Average is crowded. Be different.",
  "Winners are made in silence.",
  "You're not tired, you're untrained.",
  "Pain is temporary. Pride is forever.",
  "Do something today your future self will thank you for."
];

        document.getElementById("quoteText").textContent =
            quotes[Math.floor(Math.random()*quotes.length)];


        /* ------------------- FOCUS CHALLENGE ------------------- */
        const challengeText = document.getElementById("challengeText");
        const challenges = [
    "Study 15 minutes without touching your phone.",
    "Finish 1 task from your to-do list.",
    "Read 5 pages of a book.",
    "Clean your desk in 2 minutes.",
    "Do 10 pushups to reset your brain.",
    "Write 3 things you're grateful for.",
    "Drink a full glass of water.",
    "Stretch for 1 minute.",
    "Organize one folder on your PC.",
    "Delete 5 useless files.",
    "Review your notes for 5 minutes.",
    "Write 2 sentences of journaling.",
    "Take 10 deep breaths.",
    "Walk for 3 minutes.",
    "Uninstall 1 useless app.",
    "Do a quick posture check.",
    "Close all unused tabs.",
    "Do 20 seconds of plank.",
    "Plan tomorrow in 60 seconds.",
];

        document.getElementById("newChallenge").onclick = () => {
            challengeText.textContent =
                challenges[Math.floor(Math.random()*challenges.length)];
        };