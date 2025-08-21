// Simple routing system for MCAT Edge
class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/thank-you': 'thank-you.html'
        };
        
        this.init();
    }
    
    init() {
        // Handle initial page load
        this.handleRoute();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Handle direct navigation to thank you page
        if (window.location.pathname === '/thank-you') {
            this.loadPage('thank-you.html');
        }
    }
    
    handleRoute() {
        const path = window.location.pathname;
        const page = this.routes[path] || 'index.html';
        
        if (page !== 'index.html') {
            this.loadPage(page);
        }
    }
    
    async loadPage(pageName) {
        try {
            const response = await fetch(pageName);
            const html = await response.text();
            
            // Extract the body content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            // Update the current page content
            document.body.innerHTML = bodyContent;
            
            // Update the URL without reloading
            if (pageName === 'thank-you.html') {
                window.history.pushState({}, '', '/thank-you');
            }
            
            // Re-initialize any necessary scripts
            this.reinitializeScripts();
            
        } catch (error) {
            console.error('Error loading page:', error);
            // Fallback to index if there's an error
            window.location.href = '/';
        }
    }
    
    reinitializeScripts() {
        // Re-initialize any necessary functionality
        if (window.location.pathname === '/thank-you') {
            // Initialize thank you page specific functionality
            this.initThankYouPage();
        }
    }
    
    initThankYouPage() {
        // Add any thank you page specific functionality here
        console.log('Thank you page initialized');
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Router();
});

// Export for use in other scripts
window.Router = Router;
