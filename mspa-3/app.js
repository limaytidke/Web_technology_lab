const API_KEY = 'trilogy'; 
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const moviesContainer = document.getElementById('movies-container');
const movieModal = document.getElementById('movie-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalBodyContent = document.getElementById('modal-body-content');


async function fetchMovies(query) {
    if (!query.trim()) return;

    showLoadingState();

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.Response === 'True') {
            renderMovies(data.Search);
        } else {
            showErrorState(data.Error || 'No movies found matching your search.');
        }
    } catch (error) {
        showErrorState('Network connection error. Please check your connection and try again.');
    }
}

async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            renderMovieModal(movie);
        }
    } catch (error) {
        console.error('Failed to fetch details', error);
    }
}

function renderMovies(movies) {
    moviesContainer.innerHTML = movies.map(movie => {
        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450/1e293b/94a3b8?text=No+Poster';
        return `
                    <div class="movie-card" onclick="openDetails('${movie.imdbID}')">
                        <div class="movie-poster-wrap">
                        <img src="${posterUrl}" alt="${escapeHTML(movie.Title)}" onerror="this.src='https://placehold.co/300x450/1e293b/94a3b8?text=No+Poster'">
                        </div>
                        <div class="movie-info">
                            <div>
                                <h3 class="movie-title">${escapeHTML(movie.Title)}</h3>
                                <p class="movie-year">${escapeHTML(movie.Year)}</p>
                            </div>
                        </div>
                    </div>
                `;
    }).join('');
}

function renderMovieModal(movie) {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450/1e293b/94a3b8?text=No+Poster';

    modalBodyContent.innerHTML = `
                <img src="${posterUrl}" alt="${escapeHTML(movie.Title)}" class="modal-poster" onerror="this.src='https:
                <div class="modal-details">
                    <div>
                        <h2 class="modal-title">${escapeHTML(movie.Title)}</h2>
                        <div class="modal-meta" style="margin-top: 0.4rem;">
                            <span>${escapeHTML(movie.Year)}</span>
                            <span>•</span>
                            <span>${escapeHTML(movie.Rated)}</span>
                            <span>•</span>
                            <span>${escapeHTML(movie.Runtime)}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${movie.Genre.split(', ').map(genre => `<span class="meta-badge">${escapeHTML(genre)}</span>`).join('')}
                    </div>
                    <p class="modal-plot">${escapeHTML(movie.Plot)}</p>
                    <div class="modal-info-row"><span>Director:</span> ${escapeHTML(movie.Director)}</div>
                    <div class="modal-info-row"><span>Cast:</span> ${escapeHTML(movie.Actors)}</div>
                    <div class="modal-info-row"><span>IMDb Rating:</span> ⭐ ${escapeHTML(movie.imdbRating)} / 10</div>
                </div>
            `;

    movieModal.classList.add('active');
}

function showLoadingState() {
    moviesContainer.innerHTML = `
                <div class="state-container">
                    <div class="spinner"></div>
                    <p class="state-desc">Searching for amazing movies...</p>
                </div>
            `;
}

function showErrorState(message) {
    moviesContainer.innerHTML = `
                <div class="state-container">
                    <span class="state-icon">⚠️</span>
                    <h3 class="state-title">Oops!</h3>
                    <p class="state-desc">${escapeHTML(message)}</p>
                </div>
            `;
}

window.openDetails = function(imdbID) {
    fetchMovieDetails(imdbID);
};

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

searchBtn.addEventListener('click', () => {
    fetchMovies(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchMovies(searchInput.value);
    }
});

modalCloseBtn.addEventListener('click', () => {
    movieModal.classList.remove('active');
});

movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) {
        movieModal.classList.remove('active');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    searchInput.value = 'Avengers';
    fetchMovies('Avengers');
});
