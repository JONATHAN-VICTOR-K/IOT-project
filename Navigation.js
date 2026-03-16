// Navigation Router Logic

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const pages = document.querySelectorAll('.page-view');
    const headerTitle = document.getElementById('header-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Update Active State on Sidebar
            document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // 2. Hide all pages
            pages.forEach(page => {
                page.style.display = 'none';
                page.classList.remove('fade-in');
            });
            
            // 3. Show target page
            const targetId = link.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            if(targetPage) {
                targetPage.style.display = targetId === 'page-dashboard' ? 'grid' : 'block';
                // Small timeout to allow display:block to apply before animating opacity
                setTimeout(() => {
                    targetPage.classList.add('fade-in');
                }, 10);
            }
            
            // 4. Update Header Title
            if(headerTitle) {
                headerTitle.textContent = link.textContent.trim();
            }
        });
    });
}
