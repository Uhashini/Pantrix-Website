/**
 * Pantrix Web Platform — Interactive Engine
 * Powered by Anime.js v4 (createMotionPath) & Modern Vanilla JS
 * 
 * Features:
 * - Anime.js v4 createMotionPath SVG orbital and pipeline animations
 * - 3D Gyro Device Frame Perspective
 * - 9-Stage Pipeline Inspector & Automated Simulation Runner
 * - Tri-Mode Dashboard Engine with Dynamic Budget Sliders
 * - Multi-Chapter Interactive Demonstration Player
 * - Postman/Swagger-Style REST API Explorer with Copy-to-Clipboard
 * - Mobile Drawer & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initSvgMotionPaths();
  init3DPhoneTilt();
  initPipelineArchitecture();
  initTriModeEngine();
  initDemoShowcasePlayer();
  initApiDocumentation();
  initMobileNav();
});

/* ==========================================================================
   1. ANIME.JS v4 SVG MOTION PATH ENGINE (createMotionPath)
   Documentation: https://animejs.com/documentation/svg/createmotionpath
   ========================================================================== */
function initSvgMotionPaths() {
  const animeObj = window.anime;

  // Check if Anime.js is loaded
  if (!animeObj) {
    console.warn('[Pantrix] Anime.js not detected, using SVG native fallback.');
    initNativeSvgMotionFallback();
    return;
  }

  try {
    // ─── A. Hero Section Orbital Motion Path ──────────────────────────────
    const heroPathEl = document.querySelector('#heroMotionPath');
    if (heroPathEl) {
      if (typeof animeObj.createMotionPath === 'function') {
        // Anime.js v4 API: createMotionPath(path, offset)
        const path1 = animeObj.createMotionPath('#heroMotionPath', 0);
        const path2 = animeObj.createMotionPath('#heroMotionPath', 0.33);
        const path3 = animeObj.createMotionPath('#heroMotionPath', 0.66);

        if (animeObj.animate) {
          animeObj.animate('#heroMotionToken1', {
            ...path1,
            ease: 'linear',
            duration: 8000,
            loop: true,
          });

          animeObj.animate('#heroMotionToken2', {
            ...path2,
            ease: 'linear',
            duration: 8000,
            loop: true,
          });

          animeObj.animate('#heroMotionToken3', {
            ...path3,
            ease: 'linear',
            duration: 8000,
            loop: true,
          });
        }
      } else if (typeof animeObj.path === 'function') {
        // Anime.js v3 fallback API
        const pathV3 = animeObj.path('#heroMotionPath');
        animeObj({
          targets: '#heroMotionToken1',
          translateX: pathV3('x'),
          translateY: pathV3('y'),
          rotate: pathV3('angle'),
          easing: 'linear',
          duration: 8000,
          loop: true,
        });
      } else {
        initNativeSvgMotionFallback();
      }
    }

    // ─── B. 9-Stage Pipeline Circuit Motion Path ──────────────────────────
    const pipePathEl = document.querySelector('#pipelineMotionPath');
    if (pipePathEl) {
      if (typeof animeObj.createMotionPath === 'function' && animeObj.animate) {
        const pipePath1 = animeObj.createMotionPath('#pipelineMotionPath', 0);
        const pipePath2 = animeObj.createMotionPath('#pipelineMotionPath', 0.35);
        const pipePath3 = animeObj.createMotionPath('#pipelineMotionPath', 0.7);

        animeObj.animate('#pipelinePacket1', {
          ...pipePath1,
          ease: 'linear',
          duration: 6500,
          loop: true,
        });

        animeObj.animate('#pipelinePacket2', {
          ...pipePath2,
          ease: 'linear',
          duration: 6500,
          loop: true,
        });

        animeObj.animate('#pipelinePacket3', {
          ...pipePath3,
          ease: 'linear',
          duration: 6500,
          loop: true,
        });
      } else {
        initPipelineNativeMotionFallback();
      }
    }
  } catch (err) {
    console.info('[Pantrix] Initializing fallback SVG motion loop:', err);
    initNativeSvgMotionFallback();
    initPipelineNativeMotionFallback();
  }
}

// Resilient Native SVG Fallback (uses getPointAtLength)
function initNativeSvgMotionFallback() {
  const path = document.querySelector('#heroMotionPath');
  const t1 = document.querySelector('#heroMotionToken1');
  const t2 = document.querySelector('#heroMotionToken2');
  const t3 = document.querySelector('#heroMotionToken3');

  if (!path || !t1) return;
  const totalLength = path.getTotalLength();
  let start = performance.now();
  const speed = 0.00012; // cycles per ms

  function frame(now) {
    const elapsed = now - start;
    const progress = (elapsed * speed) % 1;

    [
      { el: t1, offset: 0 },
      { el: t2, offset: 0.33 },
      { el: t3, offset: 0.66 },
    ].forEach(({ el, offset }) => {
      if (!el) return;
      const curDist = ((progress + offset) % 1) * totalLength;
      const p = path.getPointAtLength(curDist);
      const nextDist = (curDist + 2) % totalLength;
      const pNext = path.getPointAtLength(nextDist);
      const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
      el.setAttribute('transform', `translate(${p.x}, ${p.y}) rotate(${angle})`);
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initPipelineNativeMotionFallback() {
  const path = document.querySelector('#pipelineMotionPath');
  const p1 = document.querySelector('#pipelinePacket1');
  const p2 = document.querySelector('#pipelinePacket2');
  const p3 = document.querySelector('#pipelinePacket3');

  if (!path || !p1) return;
  const totalLength = path.getTotalLength();
  let start = performance.now();
  const speed = 0.00015;

  function frame(now) {
    const elapsed = now - start;
    const progress = (elapsed * speed) % 1;

    [
      { el: p1, offset: 0 },
      { el: p2, offset: 0.35 },
      { el: p3, offset: 0.7 },
    ].forEach(({ el, offset }) => {
      if (!el) return;
      const curDist = ((progress + offset) % 1) * totalLength;
      const p = path.getPointAtLength(curDist);
      const nextDist = (curDist + 2) % totalLength;
      const pNext = path.getPointAtLength(nextDist);
      const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
      el.setAttribute('transform', `translate(${p.x}, ${p.y}) rotate(${angle})`);
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ==========================================================================
   2. 3D INTERACTIVE SMARTPHONE CHASSIS & MIRROR APP
   ========================================================================== */
function init3DPhoneTilt() {
  const container = document.getElementById('phoneContainer');
  const phone = document.getElementById('phone3d');

  if (!container || !phone) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 16;
    const rotY = (x / rect.width) * 20;

    phone.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    phone.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  // Phone Mock Mode Pills (Save Money / Eat Healthy / Gain Muscle)
  const phonePills = document.querySelectorAll('.phone-mode-pill');
  const phoneInsight = document.getElementById('phoneInsightText');

  const mockInsights = {
    money: '"You exceeded weekly budget by ₹340. <strong>74% of variance</strong> was driven by the Deluxe Ice Cream impulse purchase. Switch to low-calorie yogurt to recover ₹210."',
    health: '"Your ultra-processed food ratio dropped to <strong>18.4%</strong>. Great job on purchasing whole produce and lentils this run!"',
    muscle: '"Cart contains <strong>179.5g total protein</strong> across Chicken, Eggs, and Milk. You hit 89.8% of your weekly muscle hypertrophy goal."',
  };

  phonePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      phonePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const mode = pill.getAttribute('data-mock-mode');
      if (phoneInsight && mockInsights[mode]) {
        phoneInsight.innerHTML = mockInsights[mode];
      }
    });
  });
}

/* ==========================================================================
   3. 9-STAGE PIPELINE ARCHITECTURE (Inspector & Auto-Simulator)
   ========================================================================== */
const PIPELINE_DATA = {
  1: {
    title: 'Preprocessing & Perspective De-warping',
    tech: 'OpenCV &bull; Python',
    why: 'Mobile cameras capture receipts under uneven kitchen shadows, creased angles, and thermal printer fading. Running OCR directly on raw photos degrades accuracy below 60%. Preprocessing flattens and normalizes lighting.',
    algo: '1. Convert BGR image to LAB space; apply CLAHE (Contrast Limited Adaptive Histogram Equalization) on L-channel.<br>2. Detect document quadrilateral corners via cv2.Canny() and cv2.approxPolyDP().<br>3. Warp to top-down rectangular matrix using cv2.getPerspectiveTransform().',
    input: 'Raw JPEG/PNG Mobile Photo (1080p–4K, BGR NumPy Array)',
    output: 'Flattened, Contrast-Equalized Rectangular Matrix (np.ndarray)',
    file: 'clahe_dewarp.py',
    code: `# Stage 1: Lighting Normalization + Dewarping
def preprocess_receipt(image_bytes):
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
    # CLAHE on L-channel in LAB space
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    cl = clahe.apply(l)
    normalized = cv2.cvtColor(cv2.merge((cl,a,b)), cv2.COLOR_LAB2BGR)
    
    # 4-Corner Homography Perspective Correction
    corners = detect_quadrilateral_corners(normalized)
    M = cv2.getPerspectiveTransform(corners, target_rect)
    dewarped = cv2.warpPerspective(normalized, M, (W, H))
    return dewarped`
  },
  2: {
    title: 'Text Detection & Recognition (OCR)',
    tech: 'PaddleOCR DB-Net + CRNN',
    why: 'Text coordinates and character strings must be located accurately on the page before semantic categorization can begin.',
    algo: '1. DB-Net (Differentiable Binarization) identifies bounding polygons around ink text areas.<br>2. CRNN-CTC (Convolutional Recurrent Neural Network) transcribes pixel strips inside bounding boxes into digital strings.',
    input: 'Flattened, dewarped rectangular image (np.ndarray)',
    output: 'List of text boxes: [ [[x1,y1],[x2,y2],[x3,y3],[x4,y4]], ("MILK", 0.98) ]',
    file: 'ocr_service.py',
    code: `# Stage 2: Optical Character Recognition
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang='en')

def extract_raw_ocr(image_matrix):
    results = ocr.ocr(image_matrix, cls=True)
    boxes, texts, scores = [], [], []
    for line in results[0]:
        boxes.append(line[0])
        texts.append(line[1][0])
        scores.append(line[1][1])
    return boxes, texts, scores`
  },
  3: {
    title: 'Coordinate Normalization & Token Recovery',
    tech: 'Python Math & Space Recovery',
    why: 'Thermal printers squish characters together (e.g., "APPLEJUICE"). TokenCleaner separates tokens and scales raw pixel coordinates to a universal 0–1000 grid for transformer processing.',
    algo: '1. Regex-driven token splitting based on alphanumeric transitions.<br>2. Mathematical scaling: clip(1000 * pixel_coord / image_dimension).',
    input: 'Raw pixel bounding boxes & combined strings',
    output: 'Normalized [x1, y1, x2, y2] tokens in 0–1000 integer space',
    file: 'coord_normalizer.py',
    code: `# Stage 3: Normalize to 0-1000 grid
def normalize_bbox(box, width, height):
    return [
        int(1000 * (box[0] / width)),
        int(1000 * (box[1] / height)),
        int(1000 * (box[2] / width)),
        int(1000 * (box[3] / height))
    ]`
  },
  4: {
    title: 'Multimodal Semantic Entity Parsing',
    tech: 'LayoutLMv3 + Y-Clustering',
    why: 'Raw words have no meaning. LayoutLMv3 fuses word tokens, 2D coordinates, and visual image patches to classify entities into menu.nm, menu.cnt, menu.price, and subtotal.',
    algo: '1. Multimodal Transformer attention over text, 2D spatial layout, and image patches.<br>2. Spatial Y-axis clustering groups items into coherent horizontal line rows.',
    input: 'Tokens, 0-1000 BBoxes, Image Patches',
    output: 'Structured Line-Items: [{item: "Milk", qty: 2, price: 124.0}]',
    file: 'layoutlm_parser.py',
    code: `# Stage 4: LayoutLMv3 Entity Classification
class LayoutLMService:
    def predict_entities(self, image, words, boxes):
        encoding = processor(
            image, words, boxes=boxes,
            return_tensors="pt"
        )
        outputs = model(**encoding)
        predictions = outputs.logits.argmax(-1).squeeze().tolist()
        return self.cluster_y_axis(predictions, words, boxes)`
  },
  5: {
    title: 'Interactive Digital Reconstruction',
    tech: 'React Native & SQLite',
    why: 'AI is never 100% flawless on damaged receipts. Presenting an editable tabular UI ensures users can correct OCR mistakes in 2 taps before downstream macro and financial calculations run.',
    algo: '1. Dynamic table rendering with in-place cell editing.<br>2. Two-way binding and SQLite local persistence.',
    input: 'AI Extracted Structured JSON',
    output: '100% User-Verified Ground Truth JSON Payload',
    file: 'ReceiptTable.tsx',
    code: `# Stage 5: Verified JSON Payload
{
  "receipt_id": "REC_9841",
  "store": "Supermarket Fresh",
  "items": [
    {"name": "Amul Milk", "qty": 2, "price": 124.00, "verified": true},
    {"name": "Chicken Breast", "qty": "500g", "price": 310.00, "verified": true}
  ]
}`
  },
  6: {
    title: 'Food Database Semantic Matching',
    tech: 'RapidFuzz + SentenceTransformers',
    why: 'Receipt items use truncated abbreviations ("BRWN RICE 1KG"). Hybrid matching maps items to nutritional database IDs using syntactic string ratios and neural embeddings.',
    algo: '1. RapidFuzz token_set_ratio checks syntactic database match (>85% cutoff).<br>2. If failed, SentenceTransformers (all-MiniLM-L6-v2) computes cosine similarity against food vector embeddings.',
    input: 'Clean item name string: "Bannana Fresh"',
    output: 'Database Food Entity: food_id=4012 (Banana Raw, 89 kcal/100g, 1.1g protein)',
    file: 'hybrid_matcher.py',
    code: `# Stage 6: Syntactic + Neural Matching
def match_food_item(query):
    # Tier 1: Syntactic Fuzzy Match
    match, score, _ = process.extractOne(query, db_names)
    if score >= 85:
        return get_food_by_name(match)
        
    # Tier 2: Neural Cosine Similarity
    query_emb = embed_model.encode(query)
    sims = util.cos_sim(query_emb, precomputed_db_embs)
    best_idx = sims.argmax()
    return db_items[best_idx]`
  },
  7: {
    title: 'Behavioral Baseline Tracking (EWMA)',
    tech: 'Pandas & Rolling Stats',
    why: 'Static budget limits fail because consumer spending changes dynamically. Pantrix maintains an Exponentially Weighted Moving Average (alpha=0.3) representing normal spending behavior.',
    algo: 'EWMA formula: S_t = alpha * Y_t + (1 - alpha) * S_{t-1}, smoothly adapting to lifestyle changes while remaining resilient to one-off spikes.',
    input: 'Historical receipt totals + Current receipt total',
    output: 'Dynamic rolling baseline: ₹1,420 (tolerance upper: ₹1,850)',
    file: 'ewma_tracker.py',
    code: `# Stage 7: EWMA Spending Baseline
def update_user_baseline(user_history, current_total):
    df = pd.DataFrame(user_history)
    ewma_series = df['total'].ewm(alpha=0.3, adjust=False).mean()
    new_baseline = ewma_series.iloc[-1]
    std_dev = df['total'].std()
    return new_baseline, new_baseline + (1.5 * std_dev)`
  },
  8: {
    title: 'Anomaly Detection & Explainable AI (SHAP)',
    tech: 'Isolation Forest + TreeExplainer',
    why: 'Flagging an anomaly without explanation is unhelpful. Isolation Forest flags budget deviations, and SHAP computes game-theoretic Shapley values attributing exact rupees of variance to each purchase.',
    algo: '1. sklearn.ensemble.IsolationForest(contamination=0.1) flags out-of-distribution cart.<br>2. shap.TreeExplainer calculates marginal feature contributions for each line item.',
    input: 'Cart feature vector (spend, item counts, unit rates)',
    output: 'SHAP Attribution: Deluxe Ice Cream (+0.48), Frozen Pizza (+0.31)',
    file: 'shap_explainer.py',
    code: `# Stage 8: Isolation Forest + SHAP
def explain_anomaly(features, model):
    is_outlier = model.predict([features])[0] == -1
    if is_outlier:
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(features)
        # Sort features by highest positive impact on anomaly
        contributions = rank_contributions(shap_values, feature_names)
        return is_outlier, contributions
    return False, []`
  },
  9: {
    title: 'Guarded LLM Natural Language Synthesis',
    tech: 'Gemini 1.5 Flash / Groq Llama 3',
    why: 'Users understand conversational stories better than raw percentages. A guarded prompt injects deterministic calculations into the LLM, ensuring zero mathematical hallucinations.',
    algo: 'Structured Jinja2 prompt injection enforcing: "Only phrase the provided numbers; do not compute totals or hallucinate dollar amounts."',
    input: 'Structured JSON context containing SHAP scores & EWMA baselines',
    output: '"You overspent by ₹620 this run. SHAP attribution shows 69% was driven by luxury frozen foods..."',
    file: 'guarded_llm.py',
    code: `# Stage 9: Guarded Prompt Injection
def generate_insights(shap_summary, baseline_stats):
    prompt = f"""
    Context:
    - Baseline: ₹{baseline_stats['baseline']}
    - Actual Cart: ₹{baseline_stats['total']}
    - Anomaly Delta: +₹{baseline_stats['delta']}
    - Offending Items (SHAP): {shap_summary}
    Task: Explain the spending variance in 2 concise sentences. 
    Rule: NEVER compute any new numbers.
    """
    return llm_client.generate(prompt)`
  }
};

function initPipelineArchitecture() {
  const stageCards = document.querySelectorAll('.stage-card');
  const simBtn = document.getElementById('runPipelineSimBtn');
  const resetBtn = document.getElementById('resetPipelineBtn');
  const statusText = document.getElementById('simStatusText');
  const progressFill = document.getElementById('simProgressFill');

  // Inspector Elements
  const stageNum = document.getElementById('inspStageNum');
  const stageTitle = document.getElementById('inspStageTitle');
  const techBadge = document.getElementById('inspTech');
  const whyText = document.getElementById('inspWhy');
  const algoText = document.getElementById('inspAlgorithm');
  const inputText = document.getElementById('inspInput');
  const outputText = document.getElementById('inspOutput');
  const codeTitle = document.getElementById('inspCodeTitle');
  const codeSnippet = document.getElementById('inspCodeSnippet');

  function updateInspector(num) {
    const data = PIPELINE_DATA[num];
    if (!data) return;

    stageCards.forEach((c) => c.classList.remove('active-stage'));
    const activeCard = document.querySelector(`.stage-card[data-stage="${num}"]`);
    if (activeCard) activeCard.classList.add('active-stage');

    if (stageNum) stageNum.textContent = `Stage 0${num} Deep Dive`;
    if (stageTitle) stageTitle.textContent = data.title;
    if (techBadge) techBadge.innerHTML = data.tech;
    if (whyText) whyText.textContent = data.why;
    if (algoText) algoText.innerHTML = data.algo;
    if (inputText) inputText.textContent = data.input;
    if (outputText) outputText.textContent = data.output;
    if (codeTitle) codeTitle.textContent = data.file;
    if (codeSnippet) codeSnippet.textContent = data.code;

    if (progressFill) {
      const pct = (num / 9) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  stageCards.forEach((card) => {
    card.addEventListener('click', () => {
      const num = parseInt(card.getAttribute('data-stage'), 10);
      updateInspector(num);
      if (statusText) statusText.textContent = `Inspecting Stage 0${num}: ${PIPELINE_DATA[num].title}`;
    });
  });

  // Automated Simulation Runner
  let simTimer = null;
  let isSimulating = false;

  if (simBtn) {
    simBtn.addEventListener('click', () => {
      if (isSimulating) {
        clearInterval(simTimer);
        isSimulating = false;
        simBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume Simulation';
        return;
      }

      isSimulating = true;
      simBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Simulation';
      let currentStage = 1;

      simTimer = setInterval(() => {
        updateInspector(currentStage);
        if (statusText) {
          statusText.innerHTML = `<span style="color:#2ecc71"><i class="fa-solid fa-spinner fa-spin"></i> Executing Stage 0${currentStage}:</span> ${PIPELINE_DATA[currentStage].title}`;
        }
        currentStage++;
        if (currentStage > 9) {
          clearInterval(simTimer);
          isSimulating = false;
          simBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Re-run Simulation';
          if (statusText) {
            statusText.innerHTML = '<span style="color:#2ecc71"><i class="fa-solid fa-circle-check"></i> 9-Stage Pipeline Completed Successfully!</span>';
          }
        }
      }, 1600);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (simTimer) clearInterval(simTimer);
      isSimulating = false;
      if (simBtn) simBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Live Pipeline Simulation';
      updateInspector(1);
      if (statusText) statusText.textContent = 'Ready: Click any stage to inspect';
    });
  }
}

/* ==========================================================================
   4. TRI-MODE LIFESTYLE ENGINE
   ========================================================================== */
function initTriModeEngine() {
  const tabs = document.querySelectorAll('.tri-tab-btn');
  const panels = document.querySelectorAll('.tri-mode-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active-panel'));

      tab.classList.add('active');
      const mode = tab.getAttribute('data-mode');
      const targetPanel = document.getElementById(`panel-${mode}`);
      if (targetPanel) targetPanel.classList.add('active-panel');
    });
  });

  // Dynamic Budget Slider (Save Money Mode)
  const budgetRange = document.getElementById('budgetRange');
  const budgetValue = document.getElementById('budgetValue');

  if (budgetRange && budgetValue) {
    budgetRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      budgetValue.textContent = `₹${val.toLocaleString()}`;
    });
  }
}

/* ==========================================================================
   5. INTERACTIVE VIDEO / DEMO PLAYER
   ========================================================================== */
function initDemoShowcasePlayer() {
  const slides = document.querySelectorAll('.demo-slide');
  const chapterBtns = document.querySelectorAll('.chapter-btn');
  const playBtn = document.getElementById('demoPlayBtn');
  const nextBtn = document.getElementById('demoNextBtn');
  const progressBar = document.getElementById('demoTimelineProgress');
  const timeText = document.getElementById('demoTimeText');

  let currentChapter = 1;
  let isPlaying = true;
  let autoPlayTimer = null;

  function setChapter(num) {
    currentChapter = num;
    slides.forEach((s) => s.classList.remove('active'));
    chapterBtns.forEach((b) => b.classList.remove('active'));

    const activeSlide = document.querySelector(`.demo-slide[data-chapter="${num}"]`);
    const activeBtn = document.querySelector(`.chapter-btn[data-target-chapter="${num}"]`);

    if (activeSlide) activeSlide.classList.add('active');
    if (activeBtn) activeBtn.classList.add('active');

    if (timeText) timeText.textContent = `0${num} / 04`;
    if (progressBar) progressBar.style.width = `${(num / 4) * 100}%`;
  }

  chapterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-target-chapter'), 10);
      setChapter(target);
    });
  });

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      currentChapter = currentChapter >= 4 ? 1 : currentChapter + 1;
      setChapter(currentChapter);
    }, 4500);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoPlay();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      } else {
        startAutoPlay();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentChapter = currentChapter >= 4 ? 1 : currentChapter + 1;
      setChapter(currentChapter);
    });
  }

  startAutoPlay();
}

/* ==========================================================================
   6. REST API DOCUMENTATION & SCHEMA EXPLORER
   ========================================================================== */
const API_ENDPOINTS_DATA = {
  upload: {
    method: 'POST',
    url: 'https://api.pantrix.ai/api/v1/receipt/upload',
    curl: `curl -X POST "https://api.pantrix.ai/api/v1/receipt/upload" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@receipt_scan.jpg" \\
  -F "user_id=1"`,
    req: `// Multipart Form-Data
{
  "file": "<Binary Receipt JPEG/PNG Bytes>",
  "user_id": 1,
  "enable_clahe": true,
  "dewarp_perspective": true
}`,
    res: `{
  "status": "success",
  "receipt_id": "REC_9841",
  "merchant": "Supermarket Fresh",
  "date": "2026-10-24",
  "items": [
    { "name": "Amul Fresh Milk 1L", "qty": 2, "rate": 62.00, "total": 124.00, "category": "Dairy" },
    { "name": "Chicken Breast 500g", "qty": 1, "rate": 310.00, "total": 310.00, "category": "Meat" },
    { "name": "Deluxe Ice Cream", "qty": 1, "rate": 280.00, "total": 280.00, "category": "Frozen Desserts" }
  ],
  "subtotal": 714.00,
  "tax": 32.50,
  "total": 746.50,
  "ocr_latency_ms": 1420
}`
  },
  'save-money': {
    method: 'POST',
    url: 'https://api.pantrix.ai/api/v1/analytics/save-money',
    curl: `curl -X POST "https://api.pantrix.ai/api/v1/analytics/save-money" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": 1, "receipt_id": "REC_9841", "monthly_budget": 6000}'`,
    req: `{
  "user_id": 1,
  "receipt_id": "REC_9841",
  "monthly_budget": 6000,
  "rolling_ewma_alpha": 0.3
}`,
    res: `{
  "status": "success",
  "spending_status": "ANOMALY_OVERSPENT",
  "current_month_spend": 6240.00,
  "budget_utilization_pct": 104.0,
  "ewma_baseline": 5600.00,
  "delta_from_baseline": +640.00,
  "brand_swaps": [
    {
      "purchased": "Deluxe Brand Greek Yogurt (₹180)",
      "recommended": "Amul High-Protein Dahi (₹85)",
      "potential_savings": 95.00
    }
  ]
}`
  },
  shap: {
    method: 'POST',
    url: 'https://api.pantrix.ai/api/v1/explain/shap',
    curl: `curl -X POST "https://api.pantrix.ai/api/v1/explain/shap" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"receipt_id": "REC_9841", "model": "TreeExplainer"}'`,
    req: `{
  "receipt_id": "REC_9841",
  "model": "TreeExplainer",
  "features": ["item_spend", "brand_premium_ratio", "impulse_category_flag"]
}`,
    res: `{
  "status": "success",
  "model": "TreeExplainer (Isolation Forest)",
  "base_value": 1200.00,
  "actual_value": 1820.00,
  "feature_attributions": [
    { "feature": "Deluxe Ice Cream", "shap_value": +0.48, "rupee_impact": 240.00 },
    { "feature": "Branded Frozen Pizzas", "shap_value": +0.31, "rupee_impact": 190.00 },
    { "feature": "Imported Olive Oil", "shap_value": +0.28, "rupee_impact": 220.00 },
    { "feature": "Whole Lentils", "shap_value": -0.07, "rupee_impact": -30.00 }
  ],
  "llm_summary": "You exceeded weekly budget by ₹620. 69% of variance was caused by impulse frozen desserts."
}`
  },
  nutrition: {
    method: 'POST',
    url: 'https://api.pantrix.ai/api/v1/analytics/nutrition',
    curl: `curl -X POST "https://api.pantrix.ai/api/v1/analytics/nutrition" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"receipt_id": "REC_9841", "target_protein_grams": 200}'`,
    req: `{
  "receipt_id": "REC_9841",
  "target_protein_grams": 200,
  "compute_nova_classes": true
}`,
    res: `{
  "status": "success",
  "health_score": 82,
  "nova_distribution": {
    "group_1_whole_foods": 52.0,
    "group_2_culinary": 16.0,
    "group_3_processed": 14.0,
    "group_4_ultra_processed": 18.0
  },
  "muscle_analytics": {
    "total_cart_protein_grams": 179.5,
    "target_attainment_pct": 89.75,
    "protein_cost_efficiency": "₹1.82 / gram",
    "top_sources": [
      { "item": "Chicken Breast 500g", "protein": "105g", "efficiency": "0.34g/₹1" },
      { "item": "Farm Fresh Eggs x6", "protein": "36g", "efficiency": "0.48g/₹1" }
    ]
  }
}`
  }
};

function initApiDocumentation() {
  const endpointBtns = document.querySelectorAll('.api-endpoint-btn');
  const activeMethod = document.getElementById('apiActiveMethod');
  const activeUrl = document.getElementById('apiActiveUrl');
  const codeDisplay = document.getElementById('apiCodeDisplay');
  const tabs = document.querySelectorAll('.api-tab-link');
  const copyBtn = document.getElementById('copyCurlBtn');

  let currentEndpoint = 'upload';
  let currentTab = 'curl';

  function renderCode() {
    const data = API_ENDPOINTS_DATA[currentEndpoint];
    if (!data || !codeDisplay) return;

    if (activeMethod) activeMethod.textContent = data.method;
    if (activeUrl) activeUrl.textContent = data.url;

    if (currentTab === 'curl') {
      codeDisplay.textContent = data.curl;
    } else if (currentTab === 'req') {
      codeDisplay.textContent = data.req;
    } else if (currentTab === 'res') {
      codeDisplay.textContent = data.res;
    }
  }

  endpointBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      endpointBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentEndpoint = btn.getAttribute('data-endpoint');
      renderCode();
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.getAttribute('data-tab');
      renderCode();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const data = API_ENDPOINTS_DATA[currentEndpoint];
      if (!data) return;
      navigator.clipboard.writeText(data.curl).then(() => {
        showToast('cURL snippet copied to clipboard!');
      });
    });
  }
}

/* ==========================================================================
   7. MOBILE NAVIGATION & TOAST UTILITIES
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const msgEl = document.getElementById('toastMsg');
  if (!toast) return;

  if (msgEl) msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
