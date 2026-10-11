<script>
import { tmdbApi } from '../services/api';

export default {
  data() {
    return {
      movie: null,
    };
  },
  async mounted() {
    const movieId = this.$route.params.id;
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      this.movie = response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }
};
</script>

<template>
  <div class="details-container" v-if="movie">
    <button @click="$router.go(-1)" class="back-btn">← Back</button>
    <h1>{{ movie.title }}</h1>
    <p class="tagline" v-if="movie.tagline">"{{ movie.tagline }}"</p>
    
    <img 
      v-if="movie.poster_path" 
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
      :alt="movie.title" 
      class="detail-poster"
    />
    
    <p class="overview"><strong>Overview:</strong> {{ movie.overview }}</p>
    <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
    <p><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
  </div>
  <div v-else class="loading">
    <p>Loading movie details...</p>
  </div>
</template>

<style scoped>
.details-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  color: #F0FFFF;
}

.back-btn {
  padding: 6px 12px;
  margin-bottom: 20px;
  background-color: green;  
}

.detail-poster {
  width: 300px;
  border-radius: 8px;
  margin: 20px 0;
}

.tagline {
  
  color: #FFE4C4;
}

.loading {
  text-align: center;
  margin-top: 50px;
  color: #666;
}
</style>
