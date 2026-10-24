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
  initAnimeEngineSync();
  initSvgMotionPaths();
  init3DPhoneTilt();
  initPipelineArchitecture();
  initDemoShowcasePlayer();
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
    title: '3-Tier Product Normalization & Matching',
    tech: 'PostgreSQL pg_trgm + Semantic NLP',
    why: 'Receipt items contain abbreviations, OCR typos, and brand packaging info (e.g., "GOWARDHAN COW MLK 1L"). Raw strings cannot directly match standardized nutritional databases without multi-tier normalization.',
    algo: '1. Text Normalization: Case folding, special char removal, volume/weight stripping.<br>2. Tier 1: Fast database-level trigram similarity in PostgreSQL (pg_trgm, >0.65 threshold).<br>3. Tier 2: Token-level lexical intersection comparison.<br>4. Tier 3: SentenceTransformers cosine similarity fallback.',
    input: 'Noisy OCR text: "GOWARDHAN COW MLK 1L"',
    output: 'Canonical Product: food_id=1042 ("Cow Milk", 62 kcal, 3.2g protein)',
    file: 'three_tier_matcher.py',
    code: `# Stage 6: 3-Tier Product Matching (FYP Panel 1 Slide 22)
def match_receipt_item(raw_text, db_conn):
    # Step 1: Normalization
    clean_query = normalize_product_text(raw_text)
    
    # Tier 1: Fast PostgreSQL pg_trgm trigram matching
    query = """
    SELECT food_id, name, similarity(name, %s) as sim
    FROM food_items 
    WHERE name %% %s 
    ORDER BY sim DESC LIMIT 1;
    """
    match = db_conn.execute(query, (clean_query, clean_query)).fetchone()
    if match and match.sim >= 0.65:
        return match.food_id
        
    # Tier 2 & 3: Lexical Token & Semantic Vector Fallback
    return semantic_embedding_match(clean_query)`
  },
  7: {
    title: 'Behavioral Baseline Tracking (EWMA & STL)',
    tech: 'Pandas EWMA + STL Decomposition',
    why: 'Consumer expenditure and food choices naturally fluctuate with weekly seasonality. Pantrix uses STL decomposition to isolate long-term trends from weekly cycles and maintains an EWMA rolling average (alpha=0.3).',
    algo: '1. STL Decomposition: Separates expenditure time series Y_t into Trend T_t, Seasonal S_t, and Residual R_t.<br>2. Exponentially Weighted Moving Average (EWMA): S_t = 0.3 * Y_t + 0.7 * S_{t-1} tracking rolling baseline without lagging.',
    input: 'Historical receipt totals & item frequencies',
    output: 'Rolling dynamic baseline: ₹1,420 (Dynamic tolerance: ₹1,850)',
    file: 'ewma_stl_tracker.py',
    code: `# Stage 7: EWMA Spending Baseline (FYP Panel 1 Slide 37)
def compute_baseline_drift(user_history, current_total):
    df = pd.DataFrame(user_history)
    # EWMA alpha = 0.3
    df['ewma'] = df['total'].ewm(alpha=0.3, adjust=False).mean()
    rolling_baseline = df['ewma'].iloc[-1]
    
    # Tolerance band (1.5 sigma)
    std_dev = df['total'].std()
    tolerance_upper = rolling_baseline + (1.5 * std_dev)
    is_anomaly = current_total > tolerance_upper
    return rolling_baseline, is_anomaly`
  },
  8: {
    title: 'Anomaly Detection & Explainable AI (SHAP)',
    tech: 'Isolation Forest + TreeExplainer',
    why: 'Users ignore opaque black-box budget warnings. Isolation Forest flags anomalous expenditure carts, and SHAP computes Shapley values attributing exact rupees of deviation to individual receipt items.',
    algo: '1. sklearn.ensemble.IsolationForest(contamination=0.1) flags out-of-distribution cart vectors.<br>2. shap.TreeExplainer evaluates marginal feature contribution phi_i for each item purchase.',
    input: 'Receipt item feature vector [spend, brand_ratio, impulse_weight]',
    output: 'SHAP Feature Attribution: Deluxe Ice Cream (+0.48), Frozen Pizzas (+0.31)',
    file: 'shap_isolation_forest.py',
    code: `# Stage 8: Isolation Forest + SHAP (FYP Panel 1 Slide 35-36)
def explain_cart_anomaly(features, model, feature_names):
    prediction = model.predict([features])[0]
    if prediction == -1: # Anomaly detected
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(features)
        
        # Attribute exact rupees of variance to each line item
        attributions = sorted(
            zip(feature_names, shap_values),
            key=lambda x: x[1], reverse=True
        )
        return True, attributions
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
  const stepPills = document.querySelectorAll('.step-pill');
  const prevBtn = document.getElementById('prevStageBtn');
  const nextBtn = document.getElementById('nextStageBtn');
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
  const inspectorCard = document.getElementById('stageInspector');

  let activeStageIndex = 1;

  function updateInspector(num, shouldScroll = false) {
    if (num < 1) num = 1;
    if (num > 9) num = 9;
    activeStageIndex = num;

    const data = PIPELINE_DATA[num];
    if (!data) return;

    // Update Stage Cards active state
    stageCards.forEach((c) => {
      const cNum = parseInt(c.getAttribute('data-stage'), 10);
      const hint = c.querySelector('.inspect-hint');
      if (cNum === num) {
        c.classList.add('active-stage');
        if (hint) hint.innerHTML = '<i class="fa-solid fa-circle-info"></i> Active Stage';
      } else {
        c.classList.remove('active-stage');
        if (hint) hint.textContent = 'Click to inspect';
      }
    });

    // Update Top Quick Stepper Pills
    stepPills.forEach((p) => {
      const pNum = parseInt(p.getAttribute('data-step'), 10);
      if (pNum === num) {
        p.classList.add('active');
        p.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        p.classList.remove('active');
      }
    });

    if (stageNum) stageNum.textContent = `Stage 0${num} Deep Dive`;
    
    // Anime.js v4 ScrambleText Effect for Stage Title
    if (stageTitle) {
      if (window.anime && typeof window.anime.scrambleText === 'function' && window.anime.animate) {
        try {
          if (typeof window.anime.remove === 'function') {
            window.anime.remove(stageTitle);
          }
          window.anime.animate(stageTitle, {
            textContent: window.anime.scrambleText({
              text: data.title,
              chars: '0123456789ABCDEF$#@!%',
              cursor: '_'
            }),
            duration: 450,
            ease: 'outQuad',
            onComplete: () => {
              stageTitle.textContent = data.title;
            }
          });
        } catch (e) {
          stageTitle.textContent = data.title;
        }
      } else {
        stageTitle.textContent = data.title;
      }
    }

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

    // Auto-scroll on mobile/tablets so user immediately sees the details!
    if (shouldScroll && window.innerWidth < 992 && inspectorCard) {
      inspectorCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      inspectorCard.classList.remove('inspector-highlight-pulse');
      void inspectorCard.offsetWidth; // Trigger reflow for animation
      inspectorCard.classList.add('inspector-highlight-pulse');
      setTimeout(() => inspectorCard.classList.remove('inspector-highlight-pulse'), 1500);
    }
  }

  // Card Clicks (triggers auto-scroll on mobile)
  stageCards.forEach((card) => {
    card.addEventListener('click', () => {
      const num = parseInt(card.getAttribute('data-stage'), 10);
      updateInspector(num, true);
      if (statusText) statusText.textContent = `Inspecting Stage 0${num}: ${PIPELINE_DATA[num].title}`;
    });
  });

  // Top Stepper Pills (switches stage directly without scrolling)
  stepPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const num = parseInt(pill.getAttribute('data-step'), 10);
      updateInspector(num, false);
      if (statusText) statusText.textContent = `Inspecting Stage 0${num}: ${PIPELINE_DATA[num].title}`;
    });
  });

  // Prev / Next Stepper buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const target = activeStageIndex > 1 ? activeStageIndex - 1 : 9;
      updateInspector(target, false);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const target = activeStageIndex < 9 ? activeStageIndex + 1 : 1;
      updateInspector(target, false);
    });
  }

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
        updateInspector(currentStage, false);
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
      updateInspector(1, false);
      if (statusText) statusText.textContent = 'Ready: Click any stage to inspect';
      triggerStageStagger();
    });
  }

  // Anime.js v4 Stagger for the 9 Pipeline Stages & Stepper Pills
  function triggerStageStagger() {
    if (window.anime && typeof window.anime.stagger === 'function' && window.anime.animate) {
      window.anime.animate('.pipeline-stages-stack .stage-card', {
        opacity: [0.35, 1],
        translateX: [-16, 0],
        delay: window.anime.stagger(40, { start: 50 }),
        duration: 450,
        ease: 'outQuad'
      });
      window.anime.animate('.step-pill', {
        opacity: [0.4, 1],
        translateY: [-6, 0],
        delay: window.anime.stagger(25),
        duration: 350,
        ease: 'outQuad'
      });
    }
  }

  // Trigger stage stagger on initial load
  setTimeout(triggerStageStagger, 300);
}

/* ==========================================================================
   4. INTERACTIVE VIDEO / DEMO PLAYER
   ========================================================================== */
function initDemoShowcasePlayer() {
  const slides = document.querySelectorAll('.demo-slide');
  const chapterBtns = document.querySelectorAll('.chapter-btn');
  const playBtn = document.getElementById('demoPlayBtn');
  const prevBtn = document.getElementById('demoPrevBtn');
  const nextBtn = document.getElementById('demoNextBtn');
  const progressBar = document.getElementById('demoTimelineProgress');
  const timeText = document.getElementById('demoTimeText');

  const TOTAL_CHAPTERS = 8;
  let currentChapter = 1;
  let isPlaying = true;
  let autoPlayTimer = null;

  function setChapter(num) {
    currentChapter = num;
    slides.forEach((s) => s.classList.remove('active'));
    chapterBtns.forEach((b) => b.classList.remove('active'));

    const activeSlide = document.querySelector(`.demo-slide[data-chapter="${num}"]`);
    const activeBtn = document.querySelector(`.chapter-btn[data-target-chapter="${num}"]`);

    if (activeSlide) {
      activeSlide.classList.add('active');
      // Subtle pulse or entry stagger if Anime.js available
      if (window.anime && window.anime.animate) {
        window.anime.animate(activeSlide, {
          opacity: [0.75, 1],
          scale: [0.985, 1],
          duration: 350,
          ease: 'outQuad'
        });
      }
    }
    if (activeBtn) activeBtn.classList.add('active');

    if (timeText) timeText.textContent = `0${num} / 08`;
    if (progressBar) progressBar.style.width = `${(num / TOTAL_CHAPTERS) * 100}%`;
  }

  chapterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-target-chapter'), 10);
      setChapter(target);
    });
  });

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      currentChapter = currentChapter >= TOTAL_CHAPTERS ? 1 : currentChapter + 1;
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

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentChapter = currentChapter <= 1 ? TOTAL_CHAPTERS : currentChapter - 1;
      setChapter(currentChapter);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentChapter = currentChapter >= TOTAL_CHAPTERS ? 1 : currentChapter + 1;
      setChapter(currentChapter);
    });
  }

  startAutoPlay();
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



/* ==========================================================================
   9. ANIME.JS v4 ENGINE METHODS & SPEED/VISIBILITY (engine.update)
   Documentation: https://animejs.com/documentation/engine/engine-methods/update
   ========================================================================== */
function initAnimeEngineSync() {
  const animeObj = window.anime;
  if (!animeObj || !animeObj.engine) return;

  try {
    // Utilize engine clock & precision
    if (typeof animeObj.engine.timeUnit === 'function') {
      animeObj.engine.timeUnit('ms');
    }

    // Auto pause/resume engine clock when tab visibility changes for zero background lag
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (typeof animeObj.engine.pause === 'function') {
          animeObj.engine.pause();
        }
      } else {
        if (typeof animeObj.engine.resume === 'function') {
          animeObj.engine.resume();
        }
      }
    });
  } catch (e) {
    console.warn('[Pantrix] Anime.js engine initialization:', e);
  }
}
