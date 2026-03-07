(function() {
  'use strict';

  var API_BASE = 'https://preview.brightautomations.org';
  var pollInterval = null;
  var pollStartTime = null;
  var POLL_INTERVAL_MS = 3000;
  var POLL_START_DELAY_MS = 5000;
  var TIMEOUT_MS = 90000;

  // ===== DOM ELEMENTS =====
  var formStep1 = document.getElementById('formStep1');
  var formStep2 = document.getElementById('formStep2');
  var loadingState = document.getElementById('loadingState');
  var fallbackState = document.getElementById('fallbackState');
  var progressBar = document.getElementById('progressBar');
  var statusMessage = document.getElementById('statusMessage');
  var nextBtn = document.getElementById('nextBtn');
  var submitBtn = document.getElementById('submitBtn');
  var backBtn = document.getElementById('backBtn');
  var termsLabel = document.getElementById('termsLabel');
  var termsCheckbox = document.getElementById('termsCheckbox');
  var smsLabel = document.getElementById('smsLabel');
  var smsCheckbox = document.getElementById('smsCheckbox');

  // ===== PRE-FILL FROM URL PARAM =====
  var params = new URLSearchParams(window.location.search);
  var businessParam = params.get('business');
  if (businessParam) {
    var companyInput = document.getElementById('companyName');
    if (companyInput) companyInput.value = businessParam;
  }

  // ===== STEP NAVIGATION =====
  nextBtn.addEventListener('click', function() {
    var companyName = document.getElementById('companyName').value.trim();
    var industry = document.getElementById('industry').value;
    var city = document.getElementById('city').value.trim();
    var state = document.getElementById('state').value;

    // Validate step 1
    if (!companyName) {
      showFieldError('companyName', 'Business name is required');
      return;
    }
    if (!industry) {
      showFieldError('industry', 'Please select an industry');
      return;
    }
    if (!city) {
      showFieldError('city', 'City is required');
      return;
    }
    if (!state) {
      showFieldError('state', 'Please select a state');
      return;
    }

    clearErrors();
    formStep1.style.display = 'none';
    formStep2.style.display = 'block';
    nextBtn.style.display = 'none';
    backBtn.style.display = 'inline-flex';
    submitBtn.style.display = 'inline-flex';

    // Update step indicators
    document.querySelector('[data-step="1"]').classList.remove('active');
    document.querySelector('[data-step="1"]').classList.add('completed');
    document.querySelector('[data-step="2"]').classList.add('active');
  });

  backBtn.addEventListener('click', function() {
    formStep2.style.display = 'none';
    formStep1.style.display = 'block';
    backBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-flex';

    document.querySelector('[data-step="2"]').classList.remove('active');
    document.querySelector('[data-step="1"]').classList.remove('completed');
    document.querySelector('[data-step="1"]').classList.add('active');
  });

  // ===== TERMS & SMS CHECKBOXES =====
  function updateSubmitBtn() {
    submitBtn.disabled = !(termsCheckbox.checked && smsCheckbox.checked);
  }

  termsLabel.addEventListener('click', function(e) {
    e.preventDefault();
    termsCheckbox.checked = !termsCheckbox.checked;
    termsLabel.classList.toggle('checked', termsCheckbox.checked);
    updateSubmitBtn();
  });

  smsLabel.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') return;
    e.preventDefault();
    smsCheckbox.checked = !smsCheckbox.checked;
    smsLabel.classList.toggle('checked', smsCheckbox.checked);
    updateSubmitBtn();
  });

  // ===== FORM SUBMISSION =====
  submitBtn.addEventListener('click', function() {
    if (submitBtn.disabled) return;

    var firstName = document.getElementById('firstName').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();

    // Validate step 2
    if (!firstName) {
      showFieldError('firstName', 'First name is required');
      return;
    }
    if (!phone) {
      showFieldError('phone', 'Phone number is required');
      return;
    }
    // Basic phone validation — at least 10 digits
    var phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      showFieldError('phone', 'Please enter a valid phone number');
      return;
    }

    clearErrors();
    submitForm();
  });

  function submitForm() {
    var formData = {
      companyName: document.getElementById('companyName').value.trim(),
      firstName: document.getElementById('firstName').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim() || undefined,
      industry: document.getElementById('industry').value,
      city: document.getElementById('city').value.trim(),
      state: document.getElementById('state').value,
      sourceDetail: 'marketing_site_preview',
    };

    // Show loading state
    document.querySelector('.preview-form-card').style.display = 'none';
    document.querySelector('.step-indicators').style.display = 'none';
    document.querySelector('.preview-header').style.display = 'none';
    document.getElementById('generalError').style.display = 'none';
    loadingState.style.display = 'block';
    startLoadingAnimation();

    postToApi(formData, 0);
  }

  function postToApi(formData, retryCount) {
    fetch(API_BASE + '/api/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(function(res) {
      if (!res.ok) {
        return res.json().then(function(data) {
          throw { status: res.status, message: data.error || 'Something went wrong' };
        });
      }
      return res.json();
    })
    .then(function(data) {
      if (!data.lead || !data.lead.previewId) {
        // Lead exists from another channel without a preview
        showFallback("We already have your info! We'll text your preview link shortly.");
        return;
      }

      // Start polling for build completion
      var previewId = data.lead.previewId;
      var previewUrl = data.lead.previewUrl;
      pollStartTime = Date.now();

      setTimeout(function() {
        pollInterval = setInterval(function() {
          pollStatus(previewId, previewUrl);
        }, POLL_INTERVAL_MS);
      }, POLL_START_DELAY_MS);
    })
    .catch(function(err) {
      if (retryCount < 3 && (!err.status || err.status >= 500)) {
        // Retry with exponential backoff for network/server errors
        var delay = Math.pow(2, retryCount) * 1000;
        setTimeout(function() {
          postToApi(formData, retryCount + 1);
        }, delay);
        return;
      }

      if (err.status === 400) {
        // Validation error — go back to form
        loadingState.style.display = 'none';
        document.querySelector('.preview-form-card').style.display = 'block';
        document.querySelector('.step-indicators').style.display = 'flex';
        document.querySelector('.preview-header').style.display = 'block';
        showGeneralError(err.message);
        return;
      }

      showFallback("Something went wrong, but don't worry — we'll text your preview link shortly.");
    });
  }

  function pollStatus(previewId, previewUrl) {
    // Check timeout
    if (Date.now() - pollStartTime > TIMEOUT_MS) {
      clearInterval(pollInterval);
      showFallback("Your preview is taking a bit longer than usual. We'll text you the link when it's ready!");
      return;
    }

    fetch(API_BASE + '/api/preview/status/' + previewId)
    .then(function(res) {
      if (res.status === 429) {
        // Rate limited — slow down polling
        clearInterval(pollInterval);
        pollInterval = setInterval(function() {
          pollStatus(previewId, previewUrl);
        }, 10000);
        return null;
      }
      return res.json();
    })
    .then(function(data) {
      if (!data) return;

      if (data.status === 'ready') {
        clearInterval(pollInterval);
        // Brief pause for the progress bar to hit 100%
        setProgress(100);
        updateStatusMessage('Your preview is ready!');
        setTimeout(function() {
          window.location.href = data.previewUrl || previewUrl;
        }, 800);
      } else if (data.status === 'error') {
        clearInterval(pollInterval);
        showFallback("Something went wrong building your preview. We'll text you the link shortly.");
      }
      // else 'building' — continue polling
    })
    .catch(function() {
      // Network error during polling — don't stop, just skip this tick
    });
  }

  // ===== LOADING ANIMATION =====
  var loadingMessages = [
    { time: 0, text: 'Researching your business on Google...', progress: 10 },
    { time: 8000, text: 'Gathering your reviews and photos...', progress: 30 },
    { time: 12000, text: 'Writing custom content for your site...', progress: 55 },
    { time: 25000, text: 'Adding the finishing touches...', progress: 80 },
    { time: 35000, text: 'Almost there...', progress: 92 },
  ];

  var messageTimeouts = [];

  function startLoadingAnimation() {
    loadingMessages.forEach(function(msg) {
      var timeout = setTimeout(function() {
        updateStatusMessage(msg.text);
        setProgress(msg.progress);
      }, msg.time);
      messageTimeouts.push(timeout);
    });
  }

  function updateStatusMessage(text) {
    if (statusMessage) {
      statusMessage.style.opacity = '0';
      setTimeout(function() {
        statusMessage.textContent = text;
        statusMessage.style.opacity = '1';
      }, 300);
    }
  }

  function setProgress(percent) {
    if (progressBar) {
      progressBar.style.width = percent + '%';
    }
  }

  // ===== UI HELPERS =====
  function showFallback(message) {
    loadingState.style.display = 'none';
    fallbackState.style.display = 'block';
    var fallbackText = fallbackState.querySelector('.fallback-message');
    if (fallbackText) fallbackText.textContent = message;
    messageTimeouts.forEach(clearTimeout);
  }

  function showGeneralError(message) {
    var errorEl = document.getElementById('generalError');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function showFieldError(fieldId, message) {
    var field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('field-error');
      var errorEl = field.parentElement.querySelector('.error-text');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
    }
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(function(el) {
      el.classList.remove('field-error');
    });
    document.querySelectorAll('.error-text').forEach(function(el) {
      el.style.display = 'none';
    });
    var generalError = document.getElementById('generalError');
    if (generalError) generalError.style.display = 'none';
  }
})();
