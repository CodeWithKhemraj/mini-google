
const keywords = [
  'weather',
  'news',
  'sports',
  'technology',
  'food recipes',
  'travel tips',
  'shopping deals'
];

const searchInput = document.getElementById('search-query');
const suggestionsDiv = document.getElementById('suggestions');
const micBtn = document.getElementById('mic-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  micBtn.style.color = "#34a853"; // Change mic icon color on start
};

recognition.onend = () => {
  micBtn.style.color = "#4285f4"; // Change back on end
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  searchInput.value = transcript;
  performSearch(transcript);
};

function startRecording() {
  recognition.start();
}

function showSuggestions(query) {
  suggestionsDiv.innerHTML = '';

  if (query.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }

  const filteredKeywords = keywords.filter(keyword =>
    keyword.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredKeywords.length > 0) {
    filteredKeywords.forEach(keyword => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      suggestionItem.innerText = keyword;
      suggestionItem.onclick = () => {
        searchInput.value = keyword;
        performSearch(keyword);
        suggestionsDiv.style.display = 'none';
      };
      suggestionsDiv.appendChild(suggestionItem);
    });
    suggestionsDiv.style.display = 'block';
  } else {
    suggestionsDiv.style.display = 'none';
  }
}

async function performSearch(query) {
  const apiKey = 'AIzaSyCfxkyY_XiX5uVWi8GOdF4ulfYWN0XATNk';
  const searchEngineId = '77401807e11064cae';
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;

  const response = await fetch(url);
  const data = await response.json();
  displayResults(data.items);
}



function displayResults(items) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  const noResultsAlert = document.getElementById('no-results-alert');
  noResultsAlert.style.display = 'none'; // Hide alert by default

  if (items && items.length > 0) {
    items.forEach(item => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML =
        `<a href="${item.link}" target="_blank">${item.title}</a><p>${item.snippet}</p>`;
      resultsDiv.appendChild(resultItem);
    });
  } else {
    showNoResultsAlert();
  }
}

function showNoResultsAlert() {
  const noResultsAlert = document.getElementById('no-results-alert');
  noResultsAlert.style.display = 'block'; // Show alert
  setTimeout(() => {
    noResultsAlert.style.display = 'none'; // Hide alert after 3 seconds
  }, 3000);
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission
    performSearch(searchInput.value); // Call performSearch with current input value
  }
});


function setLanguage(langCode) {
  const luckyButton = document.getElementById('luckyButton');

  // Set the new button value based on the selected language
  switch (langCode) {
    case 'hi':
      luckyButton.value = "मैं भाग्यशाली हूँ"; // Hindi
      break;
    case 'pa':
      luckyButton.value = "आऊ भागा बला है"; // Pahari
      break;
    case 'sa':
      luckyButton.value = "अहं भाग्यशाली अस्मि"; // Pahari
      break;
    case 'bn':
      luckyButton.value = "আমি সৌভাগ্যবান"; // Bengali
      break;
    case 'te':
      luckyButton.value = "నేను అదృష్టవంతుడిని"; // Telugu
      break;
    case 'mr':
      luckyButton.value = "मी भाग्यवान आहे"; // Marathi
      break;
    case 'ta':
      luckyButton.value = "நான் அதிர்ஷ்டம்"; // Tamil
      break;
    case 'gu':
      luckyButton.value = "હું નસીબદાર છું"; // Gujarati
      break;
    case 'kn':
      luckyButton.value = "ನಾನು ಅದೃಷ್ಟಶಾಲಿ"; // Kannada
      break;
    case 'ml':
      luckyButton.value = "ഞാൻ ഭാഗ്യശാലി"; // Malayalam
      break;
    case 'pu':
      luckyButton.value = "ਮੈਂ ਕਿਸਮਤ ਵਾਲਾ ਹਾਂ"; // Punjabi
      break;
    default:
      luckyButton.value = "I'm Feeling Lucky"; // Default case
  }
}

// Show modal on page load
window.onload = function () {
  const modal = document.getElementById("welcomeModal");
  modal.style.display = "block";

  // Close the modal when the user clicks on <span> (x)
  document.getElementById("modalClose").onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when the user clicks the button
  document.getElementById("modalButton").onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};


