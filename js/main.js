(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $(".navbar").addClass("sticky-top shadow-sm");
      $(".logo").addClass("logochange");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
      $(".logo").removeClass("logochange");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 45,
    dots: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 4,
      },
      768: {
        items: 6,
      },
      992: {
        items: 8,
      },
    },
  });
})(jQuery);

document.getElementById("year").textContent = new Date().getFullYear();
// Fetch live rates using the API
async function fetchRates() {
  try {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const storedGoldRate = localStorage.getItem("goldRate");
    const storedSilverRate = localStorage.getItem("silverRate");
    const storedDate = localStorage.getItem("rateDate");
    const lastApiHitTime = localStorage.getItem("lastApiHitTime");

    // Check if the rates are already stored and are from today
    if (storedGoldRate && storedSilverRate && storedDate === today) {
      console.log(`Rates already fetched for today: ${storedDate}`);
      console.log(`Stored Gold Rate: ${storedGoldRate}`);
      console.log(`Stored Silver Rate: ${storedSilverRate}`);
      console.log(`Last API hit time: ${lastApiHitTime}`);

      document.getElementById("goldRate").textContent = storedGoldRate;
      document.getElementById("silverRate").textContent = storedSilverRate;
    } else {
      console.log(`API hit at: ${new Date().toLocaleString()}`);

      // Fetch new rates from the API since the stored rates are not up-to-date
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", "goldapi-dllnasm1yn3f33-io");
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const goldRateResponse = await fetch("https://www.goldapi.io/api/XAU/INR", requestOptions);
      if (!goldRateResponse.ok) {
        throw new Error("Failed to fetch gold rates.");
      }

      const silverRateResponse = await fetch("https://www.goldapi.io/api/XAG/INR", requestOptions);
      if (!silverRateResponse.ok) {
        throw new Error("Failed to fetch silver rates.");
      }

      const goldData = await goldRateResponse.json();
      const silverData = await silverRateResponse.json();

      const goldRateText = `₹${goldData.price_gram_24k.toFixed(2)}/gram`;
      const silverRateText = `₹${silverData.price_gram_24k.toFixed(2)}/gram`;

      // Log the fetched rates to the console
      console.log(`Fetched Gold Rate: ${goldRateText}`);
      console.log(`Fetched Silver Rate: ${silverRateText}`);

      // Display the rates on the page
      document.getElementById("goldRate").textContent = goldRateText;
      document.getElementById("silverRate").textContent = silverRateText;

      // Store the rates, today's date, and the current time in localStorage
      localStorage.setItem("goldRate", goldRateText);
      localStorage.setItem("silverRate", silverRateText);
      localStorage.setItem("rateDate", today);
      localStorage.setItem("lastApiHitTime", new Date().toLocaleString());

      // Log the storage action to the console
      console.log(`Rates stored in localStorage on: ${new Date().toLocaleString()}`);
    }
  } catch (error) {
    console.error("Error fetching rates:", error);
    document.getElementById("goldRate").innerText = "Error";
    document.getElementById("silverRate").innerText = "Error";
  }
}

// Call the function to fetch the rates on page load
fetchRates();


// Show chatbot when clicking on the WhatsApp card
document.querySelector('.whatsapp-chat-card').addEventListener('click', function() {
  document.getElementById('chatbotContainer').style.display = 'flex';
});

// Close the chatbot
document.getElementById('closeChatbot').addEventListener('click', function() {
  document.getElementById('chatbotContainer').style.display = 'none';
});

// Handle predefined question click
document.querySelectorAll('.clickable').forEach(function(questionElement) {
  questionElement.addEventListener('click', function() {
      const selectedQuestion = this.getAttribute('data-question');
      addMessage(selectedQuestion, 'user');
      handleBotResponse(selectedQuestion);
  });
});

// Send user message and trigger bot response
document.getElementById('sendMessage').addEventListener('click', function() {
  const userMessage = document.getElementById('userInput').value;
  if (userMessage.trim() === "") return;

  // Add user's message to the chat
  addMessage(userMessage, 'user');

  // Clear the input field
  document.getElementById('userInput').value = '';

  // Handle bot response
  handleBotResponse(userMessage);
});

// Function to append message to chat window
function addMessage(message, type) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message ' + (type === 'user' ? 'user-message' : 'bot-message');
  messageContainer.textContent = message;

  document.getElementById('chatbotBody').appendChild(messageContainer);
  document.getElementById('chatbotBody').scrollTop = document.getElementById('chatbotBody').scrollHeight; // Auto-scroll
}

// Handle bot responses based on predefined questions or user input
function handleBotResponse(userMessage) {
  const predefinedResponses = {
      "I Want To Sell My Gold": "Sure! You can visit our branch or call our sales support.",
      "I Want To Release My Pledged Gold": "We will guide you through the process. Please provide the pledged details.",
      "Other Enquiry": "Please describe your enquiry, and we will assist you shortly."
  };

  let response = predefinedResponses[userMessage];

  // Add bot response to the chat
  addMessage(response, 'bot');
}
