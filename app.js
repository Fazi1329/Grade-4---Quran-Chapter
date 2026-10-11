/**
 * Grade 4 Islamic Studies: The Qur'an (Chapter 7)
 * Interactive Application Engine
 */

// Application State
const state = {
  soundEnabled: true,
  studentName: "Young Scholar",
  studentAvatar: "🌙",
  currentSectionIndex: 0, // 0: Section A, 1: Section B, 2: Section C
  sectionIds: ["section-a", "section-b", "section-c"],
  
  // Scores tracking
  scores: {
    sectionA: {},
    sectionB: {},
    sectionC: {}
  },

  // Answers record for final review
  userAnswers: {
    sectionA: {},
    sectionB: {},
    sectionC: {}
  },

  // State of activity matching in Section C
  activityPlacements: {
    "act-1": {}, // targetId -> itemText
    "act-2": {},
    "act-3": {}
  },

  selectedChip: null // For touch/click tap-to-match
};

// Web Audio API Synthesizer (Zero External Dependencies)
const soundEffects = {
  ctx: null,

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  },

  playTone(freq, duration, type = "sine", gainVal = 0.15) {
    if (!state.soundEnabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback note:", e);
    }
  },

  playSuccess() {
    this.init();
    if (!state.soundEnabled || !this.ctx) return;
    // Pleasant ascending chime: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.35, "triangle", 0.2);
      }, idx * 90);
    });
  },

  playPartial() {
    this.init();
    if (!state.soundEnabled || !this.ctx) return;
    // Gentle informative double chime: G4, C5
    this.playTone(392.00, 0.25, "sine", 0.15);
    setTimeout(() => {
      this.playTone(523.25, 0.3, "sine", 0.15);
    }, 120);
  },

  playGentleBeep() {
    this.init();
    this.playTone(330, 0.2, "sine", 0.12);
  },

  playPop() {
    this.init();
    this.playTone(800, 0.08, "triangle", 0.15);
  },

  playCelebration() {
    this.init();
    if (!state.soundEnabled || !this.ctx) return;
    const melody = [
      { f: 523.25, d: 0.2 },
      { f: 659.25, d: 0.2 },
      { f: 783.99, d: 0.2 },
      { f: 1046.50, d: 0.4 },
      { f: 880.00, d: 0.2 },
      { f: 1046.50, d: 0.6 }
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, note.d, "triangle", 0.25);
      }, time);
      time += note.d * 750;
    });
  }
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupAvatarSelector();
  setupEventListeners();
  renderSectionA();
  renderSectionB();
  renderSectionC();
  renderTeacherGuide();
});

function setupEventListeners() {
  // Sound toggle button
  const soundBtn = document.getElementById("btn-toggle-sound");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.textContent = state.soundEnabled ? "🔊" : "🔇";
      soundBtn.title = state.soundEnabled ? "Mute Sound Effects" : "Unmute Sound Effects";
    });
  }

  // Start Quiz button
  const startBtn = document.getElementById("btn-start-quiz");
  if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
  }

  // Name input enter key
  const nameInput = document.getElementById("input-student-name");
  if (nameInput) {
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") startQuiz();
    });
  }
}

function setupAvatarSelector() {
  const avatarButtons = document.querySelectorAll(".avatar-option");
  avatarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      avatarButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.studentAvatar = btn.getAttribute("data-avatar") || "🌙";
      soundEffects.playPop();
    });
  });
}

function startQuiz() {
  const nameInput = document.getElementById("input-student-name");
  const enteredName = nameInput.value.trim();
  if (enteredName) {
    state.studentName = enteredName;
  }

  // Update HUD
  document.getElementById("hud-student-name").textContent = state.studentName;
  document.getElementById("hud-avatar").textContent = state.studentAvatar;

  // Transition views
  switchView("view-quiz");
  switchSection("section-a");
  updateProgressHUD();
  soundEffects.playPop();
}

function switchView(viewId) {
  document.querySelectorAll(".quiz-view").forEach((v) => v.classList.remove("active"));
  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================================================
   SECTION NAVIGATION
   ========================================================================== */
function switchSection(sectionId) {
  const index = state.sectionIds.indexOf(sectionId);
  if (index !== -1) {
    state.currentSectionIndex = index;
  }

  // Show/Hide section wrappers
  state.sectionIds.forEach((id) => {
    const el = document.getElementById(`${id}-container`);
    if (el) el.style.display = id === sectionId ? "block" : "none";
  });

  // Update Section Pills
  document.querySelectorAll(".section-pill").forEach((pill) => pill.classList.remove("active"));
  const activePill = document.getElementById(`tab-sec-${sectionId.split("-")[1]}`);
  if (activePill) activePill.classList.add("active");

  // Update Nav Buttons
  const prevBtn = document.getElementById("btn-prev-section");
  const nextBtn = document.getElementById("btn-next-section");
  const finishBtn = document.getElementById("btn-finish-quiz");

  if (prevBtn) prevBtn.style.visibility = state.currentSectionIndex === 0 ? "hidden" : "visible";

  if (state.currentSectionIndex === state.sectionIds.length - 1) {
    if (nextBtn) nextBtn.style.display = "none";
    if (finishBtn) finishBtn.style.display = "inline-flex";
  } else {
    if (nextBtn) nextBtn.style.display = "inline-flex";
    if (finishBtn) finishBtn.style.display = "none";
  }

  window.scrollTo({ top: 180, behavior: "smooth" });
  updateProgressHUD();
}

function navigateSection(delta) {
  const newIndex = state.currentSectionIndex + delta;
  if (newIndex >= 0 && newIndex < state.sectionIds.length) {
    switchSection(state.sectionIds[newIndex]);
  }
}

/* ==========================================================================
   SECTION A: SHORT ANSWER RENDERING & EVALUATION
   ========================================================================== */
function renderSectionA() {
  const container = document.getElementById("section-a-questions");
  if (!container) return;

  const sectionData = QUIZ_DATA.sections[0];
  let html = "";

  sectionData.questions.forEach((q) => {
    html += `
      <div class="question-item" id="card-${q.id}">
        <div class="q-header">
          <div class="q-meta">
            <div class="q-number-badge">${q.number}</div>
            <span class="q-marks-pill">⭐ ${q.marks} Marks</span>
            <span class="q-ref-pill">${q.pageReference}</span>
          </div>
        </div>

        <div class="q-text">${q.question}</div>

        <div class="answer-box-wrapper">
          <textarea 
            id="input-${q.id}" 
            class="short-answer-input" 
            placeholder="${q.placeholder}"
            rows="3"
          ></textarea>
          
          <div class="answer-tools">
            <button type="button" class="btn-hint" onclick="toggleHint('hint-${q.id}')">
              💡 Need a hint?
            </button>
            <button type="button" id="btn-submit-${q.id}" class="btn-submit-q" onclick="submitShortAnswer('${q.id}')">
              Submit Answer ➜
            </button>
          </div>

          <div id="hint-${q.id}" class="hint-bubble">
            <strong>Hint:</strong> ${q.hint}
          </div>
        </div>

        <!-- Feedback Container -->
        <div id="feedback-${q.id}" class="q-feedback">
          <div class="fb-header">
            <div class="fb-title" id="fb-title-${q.id}"></div>
            <div class="fb-score-pill" id="fb-score-${q.id}"></div>
          </div>
          <p id="fb-msg-${q.id}"></p>
          <div class="fb-model-answer">
            <strong>📖 Chapter 7 Model Answer:</strong>
            ${q.modelAnswer}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleHint(hintId) {
  const el = document.getElementById(hintId);
  if (el) {
    el.classList.toggle("show");
    soundEffects.playGentleBeep();
  }
}

function submitShortAnswer(questionId) {
  const sectionData = QUIZ_DATA.sections[0];
  const q = sectionData.questions.find((item) => item.id === questionId);
  if (!q) return;

  const inputEl = document.getElementById(`input-${q.id}`);
  const userText = inputEl.value.trim();

  if (!userText) {
    alert("Please write your answer in the box before submitting!");
    inputEl.focus();
    return;
  }

  // Prevent double scoring
  if (state.scores.sectionA[q.id] !== undefined) return;

  // Grade according to concepts
  const normalized = userText.toLowerCase().replace(/['".,]/g, " ");
  let earned = 0;
  let conceptsFound = [];
  let conceptsMissing = [];

  q.keywordsRequired.forEach((req) => {
    const hasMatch = req.matches.some((keyword) => normalized.includes(keyword));
    if (hasMatch) {
      earned += req.weight;
      conceptsFound.push(req.concept);
    } else {
      conceptsMissing.push(req.concept);
    }
  });

  // Clamp earned marks to max marks
  earned = Math.min(earned, q.marks);

  // Record score & answer
  state.scores.sectionA[q.id] = earned;
  state.userAnswers.sectionA[q.id] = {
    userText,
    earned,
    maxMarks: q.marks,
    question: q.question,
    modelAnswer: q.modelAnswer
  };

  // UI Updates
  inputEl.disabled = true;
  const submitBtn = document.getElementById(`btn-submit-${q.id}`);
  submitBtn.disabled = true;
  submitBtn.textContent = "Answer Checked ✓";

  const card = document.getElementById(`card-${q.id}`);
  const feedbackEl = document.getElementById(`feedback-${q.id}`);
  const fbTitle = document.getElementById(`fb-title-${q.id}`);
  const fbScore = document.getElementById(`fb-score-${q.id}`);
  const fbMsg = document.getElementById(`fb-msg-${q.id}`);

  feedbackEl.classList.remove("correct", "partial", "incorrect");

  if (earned >= q.marks) {
    card.classList.add("answered-correct");
    feedbackEl.classList.add("correct");
    fbTitle.innerHTML = "🎉 MashaAllah! Outstanding Answer!";
    fbMsg.textContent = "You mentioned all key learning points from Chapter 7!";
    soundEffects.playSuccess();
  } else if (earned > 0) {
    card.classList.add("answered-partial");
    feedbackEl.classList.add("partial");
    fbTitle.innerHTML = "✨ Good Effort!";
    fbMsg.textContent = `You captured key ideas (${conceptsFound.join(", ")}). Read the model answer below to make it complete!`;
    soundEffects.playPartial();
  } else {
    card.classList.add("answered-partial");
    feedbackEl.classList.add("incorrect");
    fbTitle.innerHTML = "💡 Good Try! Keep Learning!";
    fbMsg.textContent = "Compare your answer with the textbook learning point below to remember it for next time.";
    soundEffects.playGentleBeep();
  }

  fbScore.textContent = `${earned} / ${q.marks} Marks`;
  feedbackEl.classList.add("show");

  updateProgressHUD();
}

/* ==========================================================================
   SECTION B: ONE-WORD ANSWERS RENDERING & EVALUATION
   ========================================================================== */
function renderSectionB() {
  const container = document.getElementById("section-b-questions");
  if (!container) return;

  const sectionData = QUIZ_DATA.sections[1];
  let html = "";

  sectionData.questions.forEach((q) => {
    html += `
      <div class="question-item" id="card-${q.id}">
        <div class="q-header">
          <div class="q-meta">
            <div class="q-number-badge">${q.number}</div>
            <span class="q-marks-pill">⭐ ${q.marks} Mark</span>
            <span class="q-ref-pill">${q.pageReference}</span>
          </div>
        </div>

        <div class="q-text">${q.question}</div>

        <div class="one-word-group">
          <input 
            type="text" 
            id="input-${q.id}" 
            class="one-word-input" 
            placeholder="${q.placeholder}"
            autocomplete="off"
            onkeydown="if(event.key==='Enter') submitOneWord('${q.id}')"
          />
          <button type="button" id="btn-submit-${q.id}" class="btn-submit-q" onclick="submitOneWord('${q.id}')">
            Check Answer ✓
          </button>
        </div>

        <div class="answer-tools">
          <button type="button" class="btn-hint" onclick="toggleHint('hint-${q.id}')">
            💡 Need a hint?
          </button>
        </div>

        <div id="hint-${q.id}" class="hint-bubble">
          <strong>Hint:</strong> ${q.hint}
        </div>

        <!-- Feedback Container -->
        <div id="feedback-${q.id}" class="q-feedback">
          <div class="fb-header">
            <div class="fb-title" id="fb-title-${q.id}"></div>
            <div class="fb-score-pill" id="fb-score-${q.id}"></div>
          </div>
          <p id="fb-msg-${q.id}"></p>
          <div class="fb-model-answer">
            <strong>📖 Accepted Answer:</strong>
            ${q.acceptedAnswers[0]}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function submitOneWord(questionId) {
  const sectionData = QUIZ_DATA.sections[1];
  const q = sectionData.questions.find((item) => item.id === questionId);
  if (!q) return;

  const inputEl = document.getElementById(`input-${q.id}`);
  const rawText = inputEl.value.trim();

  if (!rawText) {
    alert("Please type an answer in the box!");
    inputEl.focus();
    return;
  }

  // Prevent double scoring if already marked correct
  if (state.scores.sectionB[q.id] === q.marks) return;

  const cleanText = rawText.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  const isMatch = q.acceptedAnswers.some((accepted) => {
    const cleanAccepted = accepted.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    return cleanText === cleanAccepted;
  });

  const card = document.getElementById(`card-${q.id}`);
  const feedbackEl = document.getElementById(`feedback-${q.id}`);
  const fbTitle = document.getElementById(`fb-title-${q.id}`);
  const fbScore = document.getElementById(`fb-score-${q.id}`);
  const fbMsg = document.getElementById(`fb-msg-${q.id}`);

  feedbackEl.classList.remove("correct", "incorrect", "partial");

  if (isMatch) {
    state.scores.sectionB[q.id] = q.marks;
    state.userAnswers.sectionB[q.id] = {
      userText: rawText,
      earned: q.marks,
      maxMarks: q.marks,
      question: q.question,
      accepted: q.acceptedAnswers[0]
    };

    inputEl.disabled = true;
    const submitBtn = document.getElementById(`btn-submit-${q.id}`);
    submitBtn.disabled = true;
    submitBtn.textContent = "Correct ✓";

    card.classList.add("answered-correct");
    feedbackEl.classList.add("correct");
    fbTitle.innerHTML = "🎉 MashaAllah! Correct!";
    fbScore.textContent = `+${q.marks} Mark`;
    fbMsg.textContent = "Spot on! That is the exact fact from Chapter 7.";
    feedbackEl.classList.add("show");
    soundEffects.playSuccess();
  } else {
    // Record 0 for this attempt, but allow student to try again
    if (state.scores.sectionB[q.id] === undefined) {
      state.scores.sectionB[q.id] = 0;
    }
    state.userAnswers.sectionB[q.id] = {
      userText: rawText,
      earned: 0,
      maxMarks: q.marks,
      question: q.question,
      accepted: q.acceptedAnswers[0]
    };

    feedbackEl.classList.add("incorrect");
    fbTitle.innerHTML = "❌ Not Quite!";
    fbScore.textContent = "0 / 1 Mark";
    fbMsg.textContent = "Check your spelling or click the hint above, then try again!";
    feedbackEl.classList.add("show");
    soundEffects.playGentleBeep();
  }

  updateProgressHUD();
}

/* ==========================================================================
   SECTION C: DRAG-AND-DROP & TAP MATCHING ENGINE
   ========================================================================== */
function renderSectionC() {
  const container = document.getElementById("section-c-activities");
  if (!container) return;

  const sectionData = QUIZ_DATA.sections[2];
  let html = "";

  sectionData.activities.forEach((act) => {
    html += `
      <div class="activity-card" id="card-${act.id}">
        <div class="activity-header">
          <div class="q-meta" style="margin-bottom: 0.5rem;">
            <span class="q-marks-pill">⭐ ${act.marks} Marks</span>
            <span class="q-ref-pill">Chapter 7</span>
          </div>
          <h3>${act.title}</h3>
          <p>${act.subtitle}</p>
        </div>

        <!-- Draggable Source Chips Pool -->
        <div class="pool-label">Available Items (Drag or Tap to match):</div>
        <div class="chips-pool" id="pool-${act.id}" data-activity="${act.id}">
          ${act.draggablePool
            .map(
              (item) => `
            <div 
              class="drag-chip" 
              id="${item.id}" 
              data-item-text="${item.text}" 
              data-activity="${act.id}"
              draggable="true"
              onclick="handleChipTap('${item.id}', '${act.id}')"
            >
              <span>${item.text}</span>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Target Drop Slots -->
        ${
          act.id === "act-3"
            ? renderSentenceBuilderTargets(act)
            : renderStandardMatchingTargets(act)
        }

        <div class="activity-actions">
          <button type="button" class="btn-reset-act" onclick="resetActivity('${act.id}')">
            🔄 Reset Cards
          </button>
          <button type="button" id="btn-check-${act.id}" class="btn-primary" onclick="checkActivityAnswers('${act.id}')" style="padding: 0.65rem 1.6rem; font-size: 1.05rem;">
            Check Matches ✓
          </button>
        </div>

        <div id="act-feedback-${act.id}" class="q-feedback">
          <div class="fb-header">
            <div class="fb-title" id="act-fb-title-${act.id}"></div>
            <div class="fb-score-pill" id="act-fb-score-${act.id}"></div>
          </div>
          <p id="act-fb-msg-${act.id}"></p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  bindDragAndDropEvents();
}

function renderStandardMatchingTargets(act) {
  return `
    <div class="match-grid">
      ${act.pairs
        .map(
          (p) => `
        <div class="match-target-card">
          <div class="target-label">
            <span>🔹</span>
            <span>${p.prompt}</span>
          </div>
          <div 
            class="drop-zone" 
            id="slot-${act.id}-${p.id}" 
            data-target-id="${p.id}" 
            data-activity="${act.id}"
            data-expected="${p.correctValue}"
            onclick="handleDropZoneTap('slot-${act.id}-${p.id}', '${act.id}')"
          >
            <span class="drop-placeholder">Drop or tap matching item here</span>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderSentenceBuilderTargets(act) {
  return `
    <div class="fill-sentences-list">
      ${act.sentences
        .map(
          (s, idx) => `
        <div class="fill-sentence-card">
          <strong>${idx + 1}.</strong> ${s.textBefore} 
          <span 
            class="sentence-drop-blank" 
            id="slot-${act.id}-${s.blankId}" 
            data-target-id="${s.blankId}" 
            data-activity="${act.id}"
            data-expected="${s.correctValue}"
            onclick="handleDropZoneTap('slot-${act.id}-${s.blankId}', '${act.id}')"
          >
            <span class="drop-placeholder">[ Click / Drop word ]</span>
          </span>
          ${s.textAfter}
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

/* ==========================================================================
   DRAG AND DROP & TAP EVENTS BINDING
   ========================================================================== */
function bindDragAndDropEvents() {
  const chips = document.querySelectorAll(".drag-chip");
  chips.forEach((chip) => {
    chip.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", chip.id);
      chip.classList.add("is-dragging");
    });

    chip.addEventListener("dragend", () => {
      chip.classList.remove("is-dragging");
    });
  });

  const dropZones = document.querySelectorAll(".drop-zone, .sentence-drop-blank");
  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-over");
      const chipId = e.dataTransfer.getData("text/plain");
      const chip = document.getElementById(chipId);
      if (chip && zone.getAttribute("data-activity") === chip.getAttribute("data-activity")) {
        placeChipInZone(chip, zone);
      }
    });
  });
}

function placeChipInZone(chip, zone) {
  // If zone already has a chip, return existing chip to pool first
  const existingChip = zone.querySelector(".drag-chip");
  const activityId = zone.getAttribute("data-activity");
  const pool = document.getElementById(`pool-${activityId}`);

  if (existingChip && existingChip !== chip) {
    pool.appendChild(existingChip);
  }

  // Remove placeholder text hiding
  const placeholder = zone.querySelector(".drop-placeholder");
  if (placeholder) placeholder.style.display = "none";

  zone.appendChild(chip);
  zone.classList.add("filled");
  state.activityPlacements[activityId][zone.getAttribute("data-target-id")] = chip.getAttribute("data-item-text");

  // Reset tap select
  if (state.selectedChip) {
    state.selectedChip.classList.remove("selected-for-tap");
    state.selectedChip = null;
  }

  soundEffects.playPop();
}

/* Tap to match for Touchscreens / Click fallback */
function handleChipTap(chipId, actId) {
  const chip = document.getElementById(chipId);
  if (!chip) return;

  // If chip is already in a slot, clicking it returns it to the pool
  const parentZone = chip.closest(".drop-zone, .sentence-drop-blank");
  if (parentZone) {
    const pool = document.getElementById(`pool-${actId}`);
    pool.appendChild(chip);
    const placeholder = parentZone.querySelector(".drop-placeholder");
    if (placeholder) placeholder.style.display = "inline";
    parentZone.classList.remove("filled", "correct-match", "incorrect-match");
    delete state.activityPlacements[actId][parentZone.getAttribute("data-target-id")];
    soundEffects.playPop();
    return;
  }

  // Otherwise, toggle selection
  if (state.selectedChip === chip) {
    chip.classList.remove("selected-for-tap");
    state.selectedChip = null;
  } else {
    if (state.selectedChip) state.selectedChip.classList.remove("selected-for-tap");
    chip.classList.add("selected-for-tap");
    state.selectedChip = chip;
    soundEffects.playPop();
  }
}

function handleDropZoneTap(zoneId, actId) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;

  if (state.selectedChip && state.selectedChip.getAttribute("data-activity") === actId) {
    placeChipInZone(state.selectedChip, zone);
  }
}

function resetActivity(actId) {
  const activity = QUIZ_DATA.sections[2].activities.find((a) => a.id === actId);
  if (!activity) return;

  const pool = document.getElementById(`pool-${actId}`);
  const card = document.getElementById(`card-${actId}`);

  // Return all chips back to pool
  activity.draggablePool.forEach((item) => {
    const chip = document.getElementById(item.id);
    if (chip) {
      pool.appendChild(chip);
      chip.classList.remove("selected-for-tap");
    }
  });

  // Reset all zones in this activity
  const zones = card.querySelectorAll(".drop-zone, .sentence-drop-blank");
  zones.forEach((z) => {
    z.classList.remove("filled", "correct-match", "incorrect-match");
    const placeholder = z.querySelector(".drop-placeholder");
    if (placeholder) placeholder.style.display = "inline";
  });

  // Hide feedback
  const feedbackEl = document.getElementById(`act-feedback-${actId}`);
  if (feedbackEl) feedbackEl.classList.remove("show", "correct", "partial", "incorrect");

  state.activityPlacements[actId] = {};
  delete state.scores.sectionC[actId];
  delete state.userAnswers.sectionC[actId];

  updateProgressHUD();
  soundEffects.playPop();
}

function checkActivityAnswers(actId) {
  const activity = QUIZ_DATA.sections[2].activities.find((a) => a.id === actId);
  if (!activity) return;

  const card = document.getElementById(`card-${actId}`);
  const zones = card.querySelectorAll(".drop-zone, .sentence-drop-blank");

  let correctCount = 0;
  let totalTargets = zones.length;
  let matchesDetail = [];

  zones.forEach((zone) => {
    const expected = zone.getAttribute("data-expected");
    const chip = zone.querySelector(".drag-chip");
    const placedText = chip ? chip.getAttribute("data-item-text") : null;

    zone.classList.remove("correct-match", "incorrect-match");

    if (placedText && placedText.trim().toLowerCase() === expected.trim().toLowerCase()) {
      correctCount++;
      zone.classList.add("correct-match");
      matchesDetail.push({ expected, placed: placedText, correct: true });
    } else {
      zone.classList.add("incorrect-match");
      matchesDetail.push({ expected, placed: placedText || "Empty", correct: false });
    }
  });

  // Total marks for activity = correctCount
  state.scores.sectionC[actId] = correctCount;
  state.userAnswers.sectionC[actId] = {
    title: activity.title,
    earned: correctCount,
    maxMarks: activity.marks,
    matchesDetail
  };

  const feedbackEl = document.getElementById(`act-feedback-${actId}`);
  const fbTitle = document.getElementById(`act-fb-title-${actId}`);
  const fbScore = document.getElementById(`act-fb-score-${actId}`);
  const fbMsg = document.getElementById(`act-fb-msg-${actId}`);

  feedbackEl.classList.remove("correct", "partial", "incorrect");

  if (correctCount === totalTargets) {
    feedbackEl.classList.add("correct");
    fbTitle.innerHTML = "🎉 MashaAllah! All Matched Perfectly!";
    fbMsg.textContent = "Every single fact matches the chapter accurately!";
    soundEffects.playSuccess();
  } else if (correctCount > 0) {
    feedbackEl.classList.add("partial");
    fbTitle.innerHTML = "✨ Great Effort!";
    fbMsg.textContent = `You got ${correctCount} out of ${totalTargets} right. The boxes in red need adjusting. You can swap them and check again!`;
    soundEffects.playPartial();
  } else {
    feedbackEl.classList.add("incorrect");
    fbTitle.innerHTML = "💡 Try Swapping the Cards!";
    fbMsg.textContent = "Check Chapter 7 or click 'Reset Cards' to try fresh.";
    soundEffects.playGentleBeep();
  }

  fbScore.textContent = `${correctCount} / ${activity.marks} Marks`;
  feedbackEl.classList.add("show");

  updateProgressHUD();
}

/* ==========================================================================
   PROGRESS HUD & SCORE TRACKER
   ========================================================================== */
function calculateTotalEarnedScore() {
  let total = 0;
  Object.values(state.scores.sectionA).forEach((val) => (total += val));
  Object.values(state.scores.sectionB).forEach((val) => (total += val));
  Object.values(state.scores.sectionC).forEach((val) => (total += val));
  return total;
}

function updateProgressHUD() {
  const currentEarned = calculateTotalEarnedScore();
  const hudScore = document.getElementById("hud-score");
  if (hudScore) hudScore.textContent = currentEarned;

  // Calculate percentage of questions answered
  const answeredA = Object.keys(state.scores.sectionA).length;
  const answeredB = Object.keys(state.scores.sectionB).length;
  const answeredC = Object.keys(state.scores.sectionC).length;

  const totalAnswered = answeredA + answeredB + answeredC;
  const totalTasks = 3 + 8 + 3; // 3 in A, 8 in B, 3 in C = 14 tasks
  const pct = Math.min(100, Math.round((totalAnswered / totalTasks) * 100));

  const progressFill = document.getElementById("hud-progress-fill");
  if (progressFill) progressFill.style.width = `${pct}%`;

  // Update Section Pills Completed States
  const pillA = document.getElementById("tab-sec-a");
  const pillB = document.getElementById("tab-sec-b");
  const pillC = document.getElementById("tab-sec-c");

  if (pillA && answeredA === 3) pillA.classList.add("completed");
  if (pillB && answeredB === 8) pillB.classList.add("completed");
  if (pillC && answeredC === 3) pillC.classList.add("completed");
}

/* ==========================================================================
   FINAL RESULTS SCREEN
   ========================================================================== */
function showFinalResults() {
  switchView("view-results");

  const totalEarned = calculateTotalEarnedScore();
  const maxScore = QUIZ_DATA.chapter.totalMarks; // 28
  const percentage = Math.round((totalEarned / maxScore) * 100);

  // Update Name & Greeting
  document.getElementById("results-name-title").textContent = `Congratulations, ${state.studentName}!`;
  document.getElementById("results-score-display").textContent = `${totalEarned} / ${maxScore}`;
  document.getElementById("results-percentage-display").textContent = `(${percentage}%)`;

  // Section Breakdown
  let secAScore = 0;
  Object.values(state.scores.sectionA).forEach((v) => (secAScore += v));
  let secBScore = 0;
  Object.values(state.scores.sectionB).forEach((v) => (secBScore += v));
  let secCScore = 0;
  Object.values(state.scores.sectionC).forEach((v) => (secCScore += v));

  document.getElementById("breakdown-score-a").textContent = `${secAScore} / 8`;
  document.getElementById("breakdown-score-b").textContent = `${secBScore} / 8`;
  document.getElementById("breakdown-score-c").textContent = `${secCScore} / 12`;

  // Dynamic Stars & Verdict Messages
  const starIcons = document.querySelectorAll("#results-stars .star-icon");
  const verdictTitle = document.getElementById("verdict-title");
  const verdictDesc = document.getElementById("verdict-desc");
  const greetingEl = document.getElementById("results-greeting");

  starIcons.forEach((s) => s.classList.remove("filled"));

  let starCount = 1;
  if (percentage >= 90) {
    starCount = 5;
    greetingEl.textContent = "مَا شَاءَ اللَّه • بَارَكَ اللَّه فِيك";
    verdictTitle.textContent = "MashaAllah! Outstanding Work! 🌟";
    verdictDesc.textContent = "You demonstrated an extraordinary understanding of Chapter 7 and the blessed teachings of the Holy Qur'an!";
  } else if (percentage >= 75) {
    starCount = 4;
    greetingEl.textContent = "مَا شَاءَ اللَّه • مُمْتَاز";
    verdictTitle.textContent = "Excellent Effort! Keep Learning! ✨";
    verdictDesc.textContent = "You know almost all key facts from the chapter. With a little revision on the missed points, you'll be at 100%!";
  } else if (percentage >= 50) {
    starCount = 3;
    greetingEl.textContent = "جَيِّد جِدًّا";
    verdictTitle.textContent = "Good Try! Practise a Little More! 📖";
    verdictDesc.textContent = "Good effort! Take a quick look at the revision points below to strengthen your Qur'anic knowledge.";
  } else {
    starCount = 2;
    greetingEl.textContent = "وَفَّقَكَ اللَّه";
    verdictTitle.textContent = "Keep Going! Every Attempt Helps You Learn! 💪";
    verdictDesc.textContent = "Reread Pages 27-30 with a teacher or parent and try again. You can do it!";
  }

  for (let i = 0; i < starCount; i++) {
    if (starIcons[i]) {
      setTimeout(() => {
        starIcons[i].classList.add("filled");
        soundEffects.playTone(600 + i * 120, 0.25, "triangle", 0.18);
      }, i * 180);
    }
  }

  // Populate Dynamic Revision Topics
  populateRevisionTopics();

  // Trigger celebration audio and confetti
  soundEffects.playCelebration();
  launchConfetti();
}

function populateRevisionTopics() {
  const revisionBox = document.getElementById("revision-box");
  const revisionList = document.getElementById("revision-list");
  if (!revisionBox || !revisionList) return;

  const points = [];

  // Check Section A missed
  if ((state.scores.sectionA["sa-1"] || 0) < 3) {
    points.push("Page 27: Why Allah sent Prophets (to bring people back to the Straight Path after people fell into evil ways).");
  }
  if ((state.scores.sectionA["sa-2"] || 0) < 3) {
    points.push("Page 28 & 30: Why the Qur'an is Allah's most precious gift (complete guidance for every aspect of life, preserved unchanged for 1400 years).");
  }
  if ((state.scores.sectionA["sa-3"] || 0) < 2) {
    points.push("Page 27: The first revelation in the Cave of Hira (Angel Jibreel's command 'Read!', squeezing the Prophet 3 times, revealing Surat al-Alaq).");
  }

  // Check Section B missed
  if ((state.scores.sectionB["ow-1"] || 0) < 1) {
    points.push("Page 27 & 29: Angel Jibreel (عليه السلام) is the Angel of Revelation.");
  }
  if ((state.scores.sectionB["ow-2"] || 0) < 1) {
    points.push("Page 28 & 29: The first revelation received was Surat al-Alaq (Verses 1-5).");
  }
  if ((state.scores.sectionB["ow-3"] || 0) < 1) {
    points.push("Page 28: The Qur'an contains exactly 114 surahs made up of aayaat.");
  }
  if ((state.scores.sectionB["ow-4"] || 0) < 1) {
    points.push("Page 28: The language of the Holy Qur'an is Arabic.");
  }
  if ((state.scores.sectionB["ow-5"] || 0) < 1) {
    points.push("Page 29: The Qur'an was revealed in stages over a period of about 23 years.");
  }
  if ((state.scores.sectionB["ow-6"] || 0) < 1) {
    points.push("Page 29: The Cave of Hira is located in Mount An-Noor.");
  }
  if ((state.scores.sectionB["ow-7"] || 0) < 1) {
    points.push("Page 27: The Holy Book given to Prophet Musa (عليه السلام) was the Tawrah.");
  }
  if ((state.scores.sectionB["ow-8"] || 0) < 1) {
    points.push("Page 29: The Arabic term for guidance is 'Hidaayah'.");
  }

  // Check Section C missed
  if ((state.scores.sectionC["act-1"] || 0) < 4) {
    points.push("Page 27: Holy Books matching (Musa -> Tawrah, Daawood -> Zaboor, Isa -> Injeel, Muhammad ﷺ -> Qur'an).");
  }
  if ((state.scores.sectionC["act-2"] || 0) < 4) {
    points.push("Page 28-30: Surat al-Muddath-thir was the second revelation; Prophet was 40 years old when revelation began.");
  }
  if ((state.scores.sectionC["act-3"] || 0) < 4) {
    points.push("Page 30: Prophet's Hadith: 'The best among you are those who learn the Qur'an and teach it to others.'");
  }

  if (points.length > 0) {
    revisionBox.style.display = "block";
    revisionList.innerHTML = points.map((pt) => `<li>${pt}</li>`).join("");
  } else {
    revisionBox.style.display = "none";
  }
}

/* ==========================================================================
   REVIEW MODAL
   ========================================================================== */
function openReviewModal() {
  const modal = document.getElementById("modal-review");
  const content = document.getElementById("review-modal-content");
  if (!modal || !content) return;

  let html = `<div style="display:flex; flex-direction:column; gap:1.5rem;">`;

  // Section A Reviews
  html += `<h4 style="color:var(--primary-emerald); border-bottom:2px solid #e2e8f0; padding-bottom:0.5rem;">Section A: Short Answer Questions</h4>`;
  QUIZ_DATA.sections[0].questions.forEach((q) => {
    const record = state.userAnswers.sectionA[q.id] || { userText: "(Not submitted)", earned: 0 };
    html += `
      <div style="background:#f8fafc; border-radius:12px; padding:1.15rem; border:1px solid #cbd5e1;">
        <div style="font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);">${q.number}. ${q.question}</div>
        <div style="margin-bottom:0.4rem;"><strong>Your Answer:</strong> <span style="color:#0369a1;">${escapeHtml(record.userText)}</span></div>
        <div style="margin-bottom:0.4rem; color:#15803d;"><strong>Model Answer:</strong> ${q.modelAnswer}</div>
        <div style="font-weight:700; color:var(--primary-emerald);">⭐ Marks Awarded: ${record.earned} / ${q.marks}</div>
      </div>
    `;
  });

  // Section B Reviews
  html += `<h4 style="color:var(--primary-emerald); border-bottom:2px solid #e2e8f0; padding-bottom:0.5rem; margin-top:1rem;">Section B: One-Word Answers</h4>`;
  QUIZ_DATA.sections[1].questions.forEach((q) => {
    const record = state.userAnswers.sectionB[q.id] || { userText: "(Not answered)", earned: 0 };
    html += `
      <div style="background:#f8fafc; border-radius:12px; padding:1.15rem; border:1px solid #cbd5e1;">
        <div style="font-weight:700; margin-bottom:0.4rem;">${q.number}. ${q.question}</div>
        <div style="margin-bottom:0.4rem;"><strong>Your Answer:</strong> <span style="color:#0369a1;">${escapeHtml(record.userText)}</span></div>
        <div style="margin-bottom:0.4rem; color:#15803d;"><strong>Accepted Answer:</strong> ${q.acceptedAnswers[0]}</div>
        <div style="font-weight:700; color:var(--primary-emerald);">⭐ Marks: ${record.earned} / ${q.marks}</div>
      </div>
    `;
  });

  // Section C Reviews
  html += `<h4 style="color:var(--primary-emerald); border-bottom:2px solid #e2e8f0; padding-bottom:0.5rem; margin-top:1rem;">Section C: Drag and Match Challenges</h4>`;
  QUIZ_DATA.sections[2].activities.forEach((act) => {
    const record = state.userAnswers.sectionC[act.id] || { earned: 0 };
    html += `
      <div style="background:#f8fafc; border-radius:12px; padding:1.15rem; border:1px solid #cbd5e1;">
        <div style="font-weight:700; color:var(--primary-emerald); margin-bottom:0.4rem;">${act.title}</div>
        <div style="font-weight:700; color:#d97706;">⭐ Marks Earned: ${record.earned || 0} / ${act.marks}</div>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;
  modal.classList.add("open");
  soundEffects.playPop();
}

function closeReviewModal() {
  document.getElementById("modal-review").classList.remove("open");
}

/* ==========================================================================
   TEACHER ANSWER KEY & MARKING GUIDE MODAL
   ========================================================================== */
function renderTeacherGuide() {
  const container = document.getElementById("teacher-modal-content");
  if (!container) return;

  const guide = QUIZ_DATA.teacherGuide;
  let html = `<div style="display:flex; flex-direction:column; gap:1.75rem;">`;

  // Header Note
  html += `
    <div style="background:#eff6ff; border-left:4px solid #0284c7; padding:1rem; border-radius:8px;">
      <strong>📘 Note for Educators & Parents:</strong> All questions, answers, spelling transliterations, and page references are derived strictly and exclusively from Chapter 7: The Qur'an (Pages 27 - 31).
    </div>
  `;

  // Section A
  html += `
    <div class="teacher-section-block">
      <h4>Section A: Short Answer Marking Scheme (8 Marks)</h4>
      <table class="guide-table">
        <thead>
          <tr>
            <th style="width: 30%;">Question & Reference</th>
            <th style="width: 50%;">Expected Key Points & Concepts</th>
            <th style="width: 20%;">Marks Allocation</th>
          </tr>
        </thead>
        <tbody>
          ${guide.sectionA
            .map(
              (item) => `
            <tr>
              <td>
                <strong>Q${item.qNum}:</strong> ${item.question}<br>
                <small style="color:#64748b;">Ref: ${item.textbookRef}</small>
              </td>
              <td>
                <ul>
                  ${item.keyPoints.map((p) => `<li>${p}</li>`).join("")}
                </ul>
              </td>
              <td><strong>${item.marks} Marks</strong></td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  // Section B
  html += `
    <div class="teacher-section-block">
      <h4>Section B: One-Word Answers Key (8 Marks)</h4>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Q#</th>
            <th>Question Prompt</th>
            <th>Accepted Model Answer</th>
            <th>Textbook Page</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          ${guide.sectionB
            .map(
              (item) => `
            <tr>
              <td><strong>Q${item.qNum}</strong></td>
              <td>${item.question}</td>
              <td><strong style="color:#15803d;">${item.answer}</strong></td>
              <td>${item.ref}</td>
              <td>1 Mark</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  // Section C
  html += `
    <div class="teacher-section-block">
      <h4>Section C: Drag-and-Drop Matching Scheme (12 Marks)</h4>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Correct Mappings / Pairs</th>
            <th>Page Ref</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          ${guide.sectionC
            .map(
              (item) => `
            <tr>
              <td><strong>${item.activity}</strong></td>
              <td>
                <ul>
                  ${item.mappings.map((m) => `<li>${m}</li>`).join("")}
                </ul>
              </td>
              <td>${item.ref}</td>
              <td><strong>${item.marks} Marks</strong></td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  html += `</div>`;
  container.innerHTML = html;
}

function openTeacherModal() {
  const modal = document.getElementById("modal-teacher");
  if (modal) {
    modal.classList.add("open");
    soundEffects.playPop();
  }
}

function closeTeacherModal() {
  document.getElementById("modal-teacher").classList.remove("open");
}

function restartQuiz() {
  location.reload();
}

function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[m]);
}

/* ==========================================================================
   CONFETTI FIREWORKS EFFECT
   ========================================================================== */
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#0f6244", "#d4a017", "#f59e0b", "#10b981", "#38bdf8", "#fbbf24", "#ffffff"];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      radius: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.75) * 16,
      gravity: 0.25,
      tilt: Math.random() * 10,
      tiltSpeed: Math.random() * 0.1,
      opacity: 1
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.tilt += p.tiltSpeed;
      p.opacity -= 0.007;

      if (p.opacity > 0 && p.y < canvas.height) {
        activeParticles++;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}
