/* eslint-disable import/no-anonymous-default-export */
const API_KEY = 'f9434ef6751c6861b51237e1771b4bc8';
const API_BASE = 'https://api.themoviedb.org/3'; // Base da URL da API que nao altera

// Função que busca os filmes na API e retorna o json da mesma
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); // Busca pela URL base + a categoria desejada(endpoint)
    const json = await req.json();
    return json;
}

export default {
    // Função que buscar dados basicos de uma 
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Voce',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Acao',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

    // Função que buscar dados completos de um filme ou serie
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) { // Primeiro verifica se um ID do filme foi enviado
            switch (type) { // Switch que verifica se é uma serie ou filme
                case 'movie': // Caso seja um filme
                    info = await basicFetch(`/movie/${movieId}?&language=pt-BR&api_key=${API_KEY}`);
                    break;

                case 'tv': // Caso seja uma serie
                    info = await basicFetch(`/tv/${movieId}?&language=pt-BR&api_key=${API_KEY}`);
                    break;

                default:
                    info = null;
                    break;
            }
        }

        return info;
    }

}