// gallery.js

document.addEventListener("DOMContentLoaded", function() {
  const filterBtns = document.querySelectorAll('.filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.querySelector('.close');
  const navPrev = document.querySelector('.nav.prev');
  const navNext = document.querySelector('.nav.next');
  let currentIdx = 0;
  let visibleImages = [];

  // Filter Functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      visibleImages = [];
      galleryItems.forEach((item, idx) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          visibleImages.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Setup visibleImages on load
  visibleImages = Array.from(galleryItems);

  // Modal Functionality
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', function() {
      modal.style.display = 'block';
      updateModal(idx);
    });
  });

  function updateModal(idx) {
    // Only show images that are currently visible
    let visible = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    currentIdx = idx;
    if (visible.length === 0) visible = galleryItems;
    const clickedItem = visibleImages[currentIdx] || visible[currentIdx];
    const imgEl = clickedItem.querySelector('img');
    modalImg.src = imgEl.src;
    modalCaption.textContent = imgEl.alt;
  }

  closeBtn.onclick = () => (modal.style.display = "none");

  navPrev.onclick = function() {
    const prevIdx = (currentIdx - 1 + visibleImages.length) % visibleImages.length;
    updateModal(prevIdx);
  };
  navNext.onclick = function() {
    const nextIdx = (currentIdx + 1) % visibleImages.length;
    updateModal(nextIdx);
  };

  // Close modal on outside click
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };
});
