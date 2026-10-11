<script>
import { tmdbApi } from '../services/api'; 

export default {
  data() {
    return {
      movies: [],
    };
  },

  methods: {
    goToDetails(id) {
      this.$router.push(`/movie/${id}`);
    }
  },

  async mounted() {
    try {
      const response = await tmdbApi.get('/movie/popular');
      this.movies = response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  }
};
</script>

<template>
  <div class="movie-container">
    <h1> Populære film lige nu! </h1>
    <div class="movie-grid">
      <div 
        v-for="movie in movies" 
        :key="movie.id" 
        class="movie-card"
        @click="goToDetails(movie.id)"
        style="cursor: pointer;"
      >
        <img 
          v-if="movie.poster_path" 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
          :alt="movie.title" 
          class="poster-img"
        />
        <h3>{{ movie.title }}</h3>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep your existing styles here */
.movie-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.poster-img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
  margin-bottom: 10px;
}

.movie-card h3 {
  font-size: 16px;
  margin: 8px 0;
  color: #333;
}

.movie-card p {
  font-size: 13px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
