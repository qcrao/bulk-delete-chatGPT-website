const reviews = [
  {
    name: "All Might",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVCXPOxl-QDfcxIvNbbfD2kYNOrpc6Z3KbkWk30WbC5df4=s48-w48-h48",
    comment:
      "Save me a lot of pain and time. Great app. That's what I am looking for! No issue with the app.",
    stars: 5,
  },
  {
    name: "你好旧时光",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjUx1sVrD3nJPYWACUZCTWUT53Wt3a6coxWapwATK1GkiOU=s48-w48-h48",
    comment:
      "好用，每天几十个对话，有些临时的，但有些第二天要用，这样马上就区分开来了",
    stars: 5,
  },
  {
    name: "Y G",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJdmclx4eN0RFaR-I3cZZ87zKwLd9HM8RwK5aFlz-T2=s48-w48-h48",
    comment: "不错，可以用！",
    stars: 5,
  },
  {
    name: "Andrew Matteson",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVcMPXMq7dRu--07YdMInRGvEeGQSVHgmgbEfcqbNZNkQ=s48-w48-h48",
    comment: "Worked great for me. Exactly what I needed.",
    stars: 5,
  },
  {
    name: "Dylan Cragg",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLM9Nyq_AoXTM5mwxhz-OwnAwGmof9sAtxVtWXtOmyX7nEHEAM=s96-w96-h96",
    comment: "Great extension!",
    stars: 5,
  },
  {
    name: "Yuqing Cai",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjWCDMxO80AYhFSgUfWtsQz03msU2wxHE6z_OHTNpqRxGEB6yPG8=s96-w96-h96",
    comment: "Great time saver. Thank you, developer!",
    stars: 5,
  },
  {
    name: "Anthony Jr. (Ant)",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjXVh_t5wuqoasVXXm3w2aEAvr8OptpI3z6yX8w2jorUM-Vaj-XViw=s96-w96-h96",
    comment:
      "Saw the solution from the creators comment on Reddit. Awesome job bro! This saved me a lot of time and helped cleaned up chatgpt. Now I'll have more organized conversations. Thank you.",
    stars: 5,
  },
  {
    name: "Jordan Harriger",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjUGyINEEQ_YZkcx0JC754ECWIvKoqpUv-2Pw7HWCi6Z3BEJPKlv=s96-w96-h96",
    comment: "Saved me so much time. Great extension",
    stars: 5,
  },
];

function createStars(count) {
  return Array(5)
    .fill()
    .map(
      (_, i) =>
        `<i class="fas fa-star ${
          i < count ? "text-yellow-400" : "text-gray-400"
        }"></i>`
    )
    .join("");
}

function createReviewElement(review) {
  return `
<div class="review-card">
  <div class="flex items-center mb-4">
    <img src="${review.avatar}" alt="${review.name}" class="review-avatar" />
    <div>
      <h3 class="review-name">${review.name}</h3>
      <div class="review-stars">
        ${createStars(review.stars)}
      </div>
    </div>
  </div>
  <p class="review-comment">"${review.comment}"</p>
</div>
`;
}

const reviewsContainer = document.getElementById("user-reviews");
reviewsContainer.innerHTML = reviews.map(createReviewElement).join("");
