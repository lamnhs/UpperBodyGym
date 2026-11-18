const EXERCISES = [
  {
    id: 1,
    stt: "01",
    name: "Đẩy ngực ghế dốc / ngang bằng máy",
    muscle: "Ngực",
    variants: ["Ghế dốc", "Ghế ngang"],
    thumb: "assets/thumbs/01.png",
    detail: "assets/details/01.png",
    guide:
      "Mở ngực, ghim hai bả vai xuống ghế. Hạ sâu để căng ngực, đẩy lên gần thẳng tay (không khóa khuỷu).",
  },
  {
    id: 2,
    stt: "02",
    name: "Kéo cáp từ trên xuống",
    muscle: "Lưng xô",
    thumb: "assets/thumbs/02.png",
    detail: "assets/details/02.png",
    guide:
      "Ngực hơi ưỡn, kéo thanh về ngực trên bằng khuỷu tay. Tránh ngả người quá sâu ra sau.",
  },
  {
    id: 3,
    stt: "03",
    name: "Đẩy vai bằng máy",
    muscle: "Vai trước / giữa",
    thumb: "assets/thumbs/03.png",
    detail: "assets/details/03.png",
    guide:
      "Lưng sát ghế, không võng lưng dưới. Hạ tay đến ngang tai hoặc cằm rồi đẩy lên có kiểm soát.",
  },
  {
    id: 4,
    stt: "04",
    name: "Kéo máy ngang / Ngồi kéo ngang",
    muscle: "Lưng giữa",
    variants: ["Kéo máy", "Ngồi kéo"],
    thumb: "assets/thumbs/04.png",
    detail: "assets/details/04.png",
    guide:
      "Giữ lưng thẳng, kéo tay cầm về rốn hoặc bụng dưới. Siết hai bả vai ở cuối nhịp, thả tạ chậm.",
  },
  {
    id: 5,
    stt: "05",
    name: "Ép ngực bằng máy",
    muscle: "Ngực",
    thumb: "assets/thumbs/05.png",
    detail: "assets/details/05.png",
    guide:
      "Khuỷu hơi gập, giữ góc khuỷu ổn định. Tưởng tượng ép hai khuỷu tay vào nhau thay vì dùng lực bàn tay.",
  },
  {
    id: 6,
    stt: "06",
    name: "Ngồi kéo cáp / Đứng kéo cáp",
    muscle: "Lưng",
    variants: ["Ngồi kéo", "Đứng kéo"],
    thumb: "assets/thumbs/06.png",
    detail: "assets/details/06.png",
    guide:
      "Ngồi tựa ghế, kéo cáp từ trên cao xuống theo góc chéo (~45°). Kéo khuỷu tay xuống dưới và về sau hông.",
  },
  {
    id: 7,
    stt: "07",
    name: "Bay vai",
    muscle: "Vai giữa",
    thumb: "assets/thumbs/07.png",
    detail: "assets/details/07.png",
    guide:
      "Hơi nghiêng người về trước, nâng tạ sang ngang bằng khuỷu đến ngang vai. Không nhún cầu vai.",
  },
  {
    id: 8,
    stt: "08",
    name: "Kéo máy vai sau / Kéo cáp mặt",
    muscle: "Vai sau",
    variants: ["Kéo máy", "Kéo cáp"],
    thumb: "assets/thumbs/08.png",
    detail: "assets/details/08.png",
    guide:
      "Hạ vai, không rụt cổ. Mở khuỷu sang hai bên, tập trung siết cơ vai sau.",
  },
  {
    id: 9,
    stt: "09",
    name: "Đẩy tay sau thanh ngang / dây cáp",
    muscle: "Tay sau",
    variants: ["Thanh ngang", "Dây cáp"],
    thumb: "assets/thumbs/09.png",
    detail: "assets/details/09.png",
    guide:
      "Giữ bắp tay sát sườn, cố định khuỷu. Chỉ chuyển động cẳng tay, duỗi hết mức thoải mái.",
  },
  {
    id: 10,
    stt: "10",
    name: "Ngồi tựa ghế nghiêng cuốn tạ",
    muscle: "Tay trước",
    thumb: "assets/thumbs/10.png",
    detail: "assets/details/10.png",
    guide:
      "Đầu và lưng sát ghế, bắp tay thả tự nhiên. Cuốn tạ lên không đưa khuỷu ra trước.",
  },
  {
    id: 11,
    stt: "11",
    name: "Kéo cáp tay sau hướng lên trên",
    muscle: "Tay sau",
    thumb: "assets/thumbs/11.png",
    detail: "assets/details/11.png",
    guide:
      "Hướng khuỷu lên trần và giữ ổn định. Hạ tay sâu ra sau đầu để kéo giãn tối đa đầu dài tay sau rồi duỗi lên.",
  },
  {
    id: 12,
    stt: "12",
    name: "Ngồi máy / Đứng kéo cáp cuốn tay",
    muscle: "Tay trước",
    variants: ["Ngồi máy", "Đứng kéo"],
    thumb: "assets/thumbs/12.png",
    detail: "assets/details/12.png",
    guide:
      "Cố định bắp tay trên đệm hoặc sát thân. Siết đỉnh tay trước 1 giây, hạ tạ chậm.",
  },
];

const STORAGE_KEY = "upper_body_weights_v1";

function loadWeights() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveWeights(weights) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weights));
  } catch {
    // Bỏ qua nếu trình duyệt chặn storage
  }
}

function sanitizeNumericInput(val) {
  return String(val).replace(/[^0-9.,]/g, "");
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

const weights = loadWeights();
const workoutListEl = document.getElementById("workoutList");
const modalEl = document.getElementById("mediaModal");
const modalImageEl = document.getElementById("modalImage");

function renderWeightInputs(ex) {
  if (ex.variants && ex.variants.length === 2) {
    return `
      <div class="weight-pair">
        ${ex.variants
          .map((label, idx) => {
            const key = `${ex.id}_${idx}`;
            const val = sanitizeNumericInput(weights[key] ?? "");
            return `
              <div class="weight-slot">
                <label class="slot-label" for="weight-${key}">${label}</label>
                <input
                  id="weight-${key}"
                  class="weight-input"
                  type="text"
                  inputmode="decimal"
                  pattern="[0-9.,]*"
                  value="${escapeAttr(val)}"
                  data-weight-key="${key}"
                  aria-label="Mức tạ ${ex.name} (${label})"
                />
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  const key = String(ex.id);
  const val = sanitizeNumericInput(weights[key] ?? "");
  return `
    <div class="input-wrap">
      <input
        id="weight-${key}"
        class="weight-input"
        type="text"
        inputmode="decimal"
        pattern="[0-9.,]*"
        value="${escapeAttr(val)}"
        data-weight-key="${key}"
        aria-label="Mức tạ bài ${ex.name}"
      />
    </div>
  `;
}

function renderWorkouts() {
  workoutListEl.innerHTML = EXERCISES.map((ex) => {
    const labelTarget = ex.variants ? `${ex.id}_0` : String(ex.id);
    return `
      <article class="workout-row" data-id="${ex.id}">
        <div class="col-stt">${ex.stt}</div>
        <div class="col-thumb">
          <button
            type="button"
            class="thumb-btn"
            data-open-id="${ex.id}"
            aria-label="Xem hình lớn bài ${ex.name}"
          >
            <img src="${ex.thumb}" alt="${ex.name}" decoding="async" />
          </button>
        </div>
        <div class="col-exercise">
          <h3 class="exercise-name">${ex.name}</h3>
          <span class="muscle-tag">${ex.muscle}</span>
        </div>
        <div class="col-guide">${ex.guide}</div>
        <div class="col-weight">
          <label class="mobile-weight-label" for="weight-${labelTarget}">Mức tạ:</label>
          <div class="weight-fields">
            ${renderWeightInputs(ex)}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Chỉ cho nhập số (và dấu , hoặc .) và tự động lưu mãi mãi
function handleWeightSave(e) {
  const input = e.target.closest(".weight-input");
  if (!input) return;

  const cleaned = sanitizeNumericInput(input.value);
  if (input.value !== cleaned) {
    input.value = cleaned;
  }

  const key = input.dataset.weightKey;
  if (cleaned === "") {
    delete weights[key];
  } else {
    weights[key] = cleaned;
  }
  saveWeights(weights);
}

workoutListEl.addEventListener("input", handleWeightSave);
workoutListEl.addEventListener("change", handleWeightSave);

// Mở Modal xem hình chi tiết khi bấm vào hình nhỏ
workoutListEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".thumb-btn");
  if (!btn) return;

  const id = Number(btn.dataset.openId);
  const ex = EXERCISES.find((item) => item.id === id);
  if (!ex) return;

  modalImageEl.src = ex.detail;
  modalImageEl.alt = ex.name;
  modalEl.hidden = false;
  document.body.style.overflow = "hidden";
});

function closeModal() {
  modalEl.hidden = true;
  modalImageEl.src = "";
  document.body.style.overflow = "";
}

document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.hidden) {
    closeModal();
  }
});

window.addEventListener("pagehide", () => saveWeights(weights));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveWeights(weights);
  }
});

renderWorkouts();
