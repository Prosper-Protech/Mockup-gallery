
        // Sample image data with higher resolution image URLs
        const images = [
            {
                id: 1,
                title: "T-shirt black",
                description: "front and back",
                category: "collar-shirts",
                url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001152967.jpg?alt=media&token=c49dd5a9-e4dc-4b09-9503-616af972efda",
                downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001152967.jpg?alt=media&token=c49dd5a9-e4dc-4b09-9503-616af972efda"
            },
            {
                id: 2,
                title: "T-shirt White",
                description: "front and back",
                category: "collar-shirts",
                url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153044.jpg?alt=media&token=fe2c5bd5-0e6d-47d6-8546-035d23b8102a",
                downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153044.jpg?alt=media&token=fe2c5bd5-0e6d-47d6-8546-035d23b8102a"
            },
            {
                id: 3,
                title: "Hoodies/Polova Black",
                description: "front and back ",
                category: "hoodies",
                url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001152988.jpg?alt=media&token=eb8a1e50-39c8-45aa-bd89-694d7e96b400",
                downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001152988.jpg?alt=media&token=eb8a1e50-39c8-45aa-bd89-694d7e96b400"
            },
            {
                id: 4,
                title: "Hoodies/Polova White",
                description: "front and back",
                category: "hoodies",
                url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153211.jpg?alt=media&token=72162267-61d3-47f1-854c-63a57729d436",
                downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153211.jpg?alt=media&token=72162267-61d3-47f1-854c-63a57729d436"
            },
            {
            id: 5,
            title: "Hoodies/Polova White 2",
            description: "front and back",
            category: "hoodies",
            url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153222.jpg?alt=media&token=d526474d-434e-4784-bae1-311390cb3007",
            downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153222.jpg?alt=media&token=d526474d-434e-4784-bae1-311390cb3007"
            },
            {
                id: 6,
                title: "Round Necks shirt front",
                description: "rounded no collar",
                category: "round-neck",
                url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153061.jpg?alt=media&token=fed55b3a-2a93-46a0-9cfe-7d2ae5f41777",
                downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153061.jpg?alt=media&token=fed55b3a-2a93-46a0-9cfe-7d2ae5f41777"
            },
            {
                id: 7,
                title: "Round Necks shirt back",
                description: "rounded no collar",
                category: "round-neck",
                url: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153179.jpg?alt=media&token=27809262-7c40-4c77-b3f6-f6df09179709",
                downloadUrl: "https://firebasestorage.googleapis.com/v0/b/i-to-u.appspot.com/o/publicimage%2F1001153179.jpg?alt=media&token=27809262-7c40-4c77-b3f6-f6df09179709"
            }
        ];

        // DOM Elements
        const gallery = document.getElementById('imageGallery');
        const themeToggle = document.getElementById('themeToggle');
        const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDownload = document.getElementById('modalDownload');
        const modalClose = document.getElementById('modalClose');
        const prevButton = document.getElementById('prevImage');
        const nextButton = document.getElementById('nextImage');
        const starsContainer = document.getElementById('stars');

        // Current state
        let currentFilter = 'all';
        let currentSearch = '';
        let currentImages = [];
        let currentModalIndex = 0;

        // Initialize the gallery
        function initGallery() {
            renderImages();
            createStars();
            setupEventListeners();
        }

        // Create starry background
        function createStars() {
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Random position and size
                const size = Math.random() * 3 + 1;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                
                // Random opacity
                star.style.opacity = Math.random() * 0.7 + 0.3;
                
                // Add twinkling animation
                const duration = Math.random() * 5 + 3;
                star.style.animation = `twinkle ${duration}s infinite alternate`;
                
                starsContainer.appendChild(star);
            }
            
            // Add twinkling animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes twinkle {
                    0% { opacity: 0.3; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Render images to the gallery
        function renderImages() {
            // Clear current gallery
            gallery.innerHTML = '';
            
            // Filter images based on current filter and search
            currentImages = images.filter(image => {
                const matchesFilter = currentFilter === 'all' || image.category === currentFilter;
                const matchesSearch = image.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                                     image.description.toLowerCase().includes(currentSearch.toLowerCase());
                return matchesFilter && matchesSearch;
            });
            
            // If no images found
            if (currentImages.length === 0) {
                gallery.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h2>No images found</h2>
                        <p>Try a different search or filter</p>
                    </div>
                `;
                return;
            }
            
            // Create image cards
            currentImages.forEach((image, index) => {
                const imageCard = document.createElement('div');
                imageCard.className = 'image-card';
                imageCard.dataset.index = index;
                
                imageCard.innerHTML = `
                    <div class="image-container">
                        <img src="${image.url}" alt="${image.title}" loading="lazy">
                        <div class="image-actions">
                            <button class="action-btn download-card-btn" data-index="${index}" title="Download">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="action-btn view-card-btn" data-index="${index}" title="View Fullscreen">
                                <i class="fas fa-expand"></i>
                            </button>
                        </div>
                    </div>
                    <div class="image-info">
                        <h3 class="image-title">${image.title}</h3>
                        <p class="image-desc">${image.description}</p>
                    </div>
                `;
                
                gallery.appendChild(imageCard);
            });
            
            // Add event listeners to card buttons
            document.querySelectorAll('.view-card-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(btn.dataset.index);
                    openModal(index);
                });
            });
            
            document.querySelectorAll('.download-card-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(btn.dataset.index);
                    downloadImage(index);
                });
            });
            
            // Add click event to entire card to open modal
            document.querySelectorAll('.image-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Only trigger if not clicking on buttons
                    if (!e.target.closest('.action-btn')) {
                        const index = parseInt(card.dataset.index);
                        openModal(index);
                    }
                });
            });
        }

        // Open modal with image
        function openModal(index) {
            currentModalIndex = index;
            updateModal();
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close modal
        function closeModal() {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Update modal content
        function updateModal() {
            const image = currentImages[currentModalIndex];
            modalImage.src = image.url;
            modalImage.alt = image.title;
            modalTitle.textContent = `${image.title} - ${image.description}`;
            
            // Update download button
            modalDownload.onclick = () => downloadImage(currentModalIndex);
        }

        // Download image
        function downloadImage(index) {
            const image = currentImages[index];
            const link = document.createElement('a');
            link.href = image.downloadUrl || image.url;
            link.download = `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show download feedback
            const originalText = modalDownload.innerHTML;
            modalDownload.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            modalDownload.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                modalDownload.innerHTML = originalText;
                modalDownload.style.backgroundColor = '';
            }, 1500);
        }

        // Navigate to previous image in modal
        function prevImage() {
            currentModalIndex = (currentModalIndex - 1 + currentImages.length) % currentImages.length;
            updateModal();
        }

        // Navigate to next image in modal
        function nextImage() {
            currentModalIndex = (currentModalIndex + 1) % currentImages.length;
            updateModal();
        }

        // Toggle theme
        function toggleTheme() {
            const isLightMode = document.body.classList.contains('light-mode');
            const icon = themeToggle.querySelector('i');
            
            if (isLightMode) {
                document.body.classList.remove('light-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                document.body.classList.add('light-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        // Filter images by category
        function filterImages(category) {
            currentFilter = category;
            
            // Update active filter button
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            renderImages();
        }

        // Search images
        function searchImages(searchTerm) {
            currentSearch = searchTerm;
            renderImages();
        }

        // Set up event listeners
        function setupEventListeners() {
            // Theme toggle
            themeToggle.addEventListener('click', toggleTheme);
            
            // Search input
            searchInput.addEventListener('input', (e) => {
                searchImages(e.target.value);
            });
            
            // Filter buttons
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterImages(btn.dataset.filter);
                });
            });
            
            // Modal controls
            modalClose.addEventListener('click', closeModal);
            prevButton.addEventListener('click', prevImage);
            nextButton.addEventListener('click', nextImage);
            
            // Close modal when clicking outside the image
            imageModal.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    closeModal();
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!imageModal.classList.contains('active')) return;
                
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'd' || e.key === 'D') downloadImage(currentModalIndex);
            });
        }

        // Initialize the gallery when page loads
        document.addEventListener('DOMContentLoaded', initGallery);
    