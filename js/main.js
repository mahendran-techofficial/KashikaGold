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
      $(".namelogo").addClass("namelogochange");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
      $(".logo").removeClass("logochange");
      $(".namelogo").removeClass("namelogochange");
    }
  });

  //Whatspp and Call Sticky Icons
  // window.addEventListener('scroll', function() {
  //   const telButton = document.querySelector('.fixed-tel');
  //   const whatsappButton = document.querySelector('.fixed-whatsapp');
  //   // Show buttons after scrolling 100px
  //   if (window.scrollY > 100) {
  //     telButton.classList.add('visible');
  //     whatsappButton.classList.add('visible');
  //   } else {
  //     telButton.classList.remove('visible');
  //     whatsappButton.classList.remove('visible');
  //   }
  // });

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

// Function to show the chatbot and play sound after 2 seconds
window.addEventListener("load", function () {
  setTimeout(function () {
    // Play sound effect
    var soundEffect = new Audio("./img/achive-sound.mp3"); // Make sure to add the correct path to your sound file
    //soundEffect.play();

    // Show the chatbot
    // document.getElementById('chatbotContainer').style.display = 'flex';
  }, 2000); // Delay of 2 seconds
});

// Close the chatbot
document.getElementById("closeChatbot").addEventListener("click", function () {
  document.getElementById("chatbotContainer").style.display = "none";
});

// Handle predefined question click
document.querySelectorAll(".clickable").forEach(function (questionElement) {
  questionElement.addEventListener("click", function () {
    const selectedQuestion = this.getAttribute("data-question");
    addMessage(selectedQuestion, "user");
    handleBotResponse(selectedQuestion);
  });
});

// Send user message and trigger bot response
document.getElementById("sendMessage").addEventListener("click", function () {
  const userMessage = document.getElementById("userInput").value;
  if (userMessage.trim() === "") return;

  // Add user's message to the chat
  addMessage(userMessage, "user");

  // Clear the input field
  document.getElementById("userInput").value = "";

  // Handle bot response
  handleBotResponse(userMessage);
});

// Function to append message to chat window
function addMessage(message, type) {
  const messageContainer = document.createElement("div");
  messageContainer.className =
    "message " + (type === "user" ? "user-message" : "bot-message");
  messageContainer.textContent = message;

  document.getElementById("chatbotBody").appendChild(messageContainer);
  document.getElementById("chatbotBody").scrollTop =
    document.getElementById("chatbotBody").scrollHeight; // Auto-scroll
}

// Handle bot responses based on predefined questions or user input
function handleBotResponse(userMessage) {
  const predefinedResponses = {
    "I Want To Sell My Gold":
      "Sure! You can visit our branch or call our sales support.",
    "I Want To Release My Pledged Gold":
      "We will guide you through the process. Please provide the pledged details.",
    "Other Enquiry":
      "Please describe your enquiry, and we will assist you shortly.",
  };

  let response = predefinedResponses[userMessage];

  // Add bot response to the chat
  addMessage(response, "bot");
}

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".count-text");

  const animateCounter = (counter) => {
    const speed = parseInt(counter.getAttribute("data-speed"));
    const stop = parseFloat(counter.getAttribute("data-stop"));

    let currentCount = 0;
    const increment = stop / (speed / 50);

    const counterInterval = setInterval(() => {
      if (currentCount < stop) {
        currentCount += increment;
        counter.innerText = Math.floor(currentCount).toLocaleString();
      } else {
        counter.innerText = stop.toLocaleString();
        clearInterval(counterInterval);
      }
    }, 50);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the counter animation when the section comes into view
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Stop observing once the animation starts
        }
      });
    },
    {
      threshold: 0.5, // Trigger when at least 50% of the section is in view
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter); // Observe each counter element
  });
});

// Show the modal when the page loads
window.onload = function () {
  const modal = document.getElementById("quoteModal");
  const closeBtn = document.getElementById("closeBtn");

  // Show the modal
  modal.style.display = "block";

  // Close the modal when the close button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal if the user clicks anywhere outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  //Mobile number validation in form
  // Select form and mobile input
  const form = document.getElementById("quoteForm");
  const mobileInput = document.getElementById("mobile");

  // Restrict input to numbers only
  mobileInput.addEventListener("input", (event) => {
    // Remove any non-numeric characters
    event.target.value = event.target.value.replace(/\D/g, "");
  });

  // Validate on form submit
  form.addEventListener("submit", (event) => {
    const mobileNumber = mobileInput.value;

    // Check if the mobile number is exactly 10 digits
    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Mobile number must be exactly 10 digits.");
      event.preventDefault();
      return;
    }

    // Check for specific invalid numbers
    const invalidNumbers = ["1234567890", "0987654321", "0123456789"];
    if (invalidNumbers.includes(mobileNumber)) {
      alert("Please enter a valid mobile number.");
      event.preventDefault();
      return;
    }

    modal.style.display = "none";
    // All validations passed, form will be submitted
  });
};
