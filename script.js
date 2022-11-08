// Selecting Content
const newQuoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector(".twitter-button");
const quotes = document.querySelector("#quote");
const author = document.querySelector("#author");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector("#quote-container");

// Function to get the quote
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    complete();
    const randomNumber = Math.floor(Math.random() * data.length);
    const quote = data[randomNumber];
    quotes.textContent = quote.text;
    author.textContent = quote.author;
    if (!quote.author) {
      author.textContent = "Unknown";
    } else {
      author.textContent = quote.author;
    }
  } catch (error) {
    console.error(error);
  }
}

getQuotes();

// Function to Tweet the quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text =${quotes.textContent} - ${author.textContent} `;
  window.open(twitterUrl, "_blank");
}
// Function for loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Function when the content is ready
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

newQuoteButton.addEventListener("click", () => {
  getQuotes();
});

twitterButton.addEventListener("click", () => {
  tweetQuote();
});
