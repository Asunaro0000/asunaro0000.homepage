// BOOTH / Avatar shop card
// 商品個別ページへ直接飛ばしたい場合は、このURLだけ変更してください。
const BOOTH_URL = "https://asunaro0000.booth.pm/";
const SHINANO_IMAGE = "./assets/booth/shinano_classical_outfit.webp";

const boothCard = document.getElementById("booth-avatar-card");
const boothImg = document.getElementById("booth-avatar-img");
const boothBtn = document.getElementById("booth-avatar-btn");
const boothLink = document.getElementById("booth-avatar-link");

function openBooth() {
  window.open(BOOTH_URL, "_blank", "noopener,noreferrer");
}

if (boothImg) {
  boothImg.src = SHINANO_IMAGE;
  boothImg.alt = "SHINANO Classical Outfit Set";
}

if (boothBtn) {
  boothBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openBooth();
  });
}

if (boothLink) {
  boothLink.href = BOOTH_URL;
}

// カード本体をクリックしてもBOOTHへ移動。
if (boothCard) {
  boothCard.style.cursor = "pointer";
  boothCard.addEventListener("click", (e) => {
    if (e.target.closest("button, a")) return;
    openBooth();
  });
}
