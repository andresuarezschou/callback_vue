<script>
import axios from 'axios';
import TutorialTable from "./TutorialTable.vue";
import MovieList from "./MovieList.vue";

export default {
  name: "HomeView",

  components: {
    TutorialTable,
    MovieList,
  },
  data() {
    return {
      tutorials: [],
      method: "",
    };
  },

  methods: {
    // 1 CALLBACK STYLE
    getWithCallback() {
      this.method = "Callback";
      this.tutorials = [];

      console.log("1 Callback: start");

      axios.get("http://localhost:8080/api/tutorials").then((response) => {
        console.log("2 Callback: data received");

        setTimeout(() => {
          console.log("3 Callback: inside nested callback");
          this.tutorials = response.data;
        }, 1000);
      });

      console.log("4 Callback: end");
    },

    // 2 PROMISE STYLE
    getWithPromise() {
      this.method = "Promise";
      this.tutorials = [];

      console.log("1 Promise: start");

      axios
        .get("http://localhost:8080/api/tutorials")
        .then((response) => {
          console.log("2 Promise: data received");
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(response.data);
            }, 1000);
          });
        })
        .then((data) => {
          console.log("3 Promise: after second async step");
          this.tutorials = data;
        })
        .catch((error) => {
          console.error(error);
        });

      console.log("4 Promise: end");
    },

    // 3 ASYNC / AWAIT
    async getWithAsync() {
      this.method = "Async / Await";
      this.tutorials = [];

      console.log("1 Async: start");

      try {
        const response = await axios.get("http://localhost:8080/api/tutorials");
        console.log("2 Async: data received");

        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });

        console.log("3 Async: after await delay");
        this.tutorials = response.data;
      } catch (error) {
        console.error(error);
      }

      console.log("4 Async: end");
    },
  },
};
</script>

<template>
  <div class="app">
    <h2>Tutorials</h2>

    <p class="method"><strong>Current method:</strong> {{ method }}</p>

    <div class="controls">
      <button @click="getWithCallback">Callback</button>
      <button @click="getWithPromise">Promise</button>
      <button @click="getWithAsync">Async / Await</button>
    </div>

    <TutorialTable :tutorials="tutorials" />
  </div>

  <div class="movie-section">
    <MovieList />
  </div>
</template>

<style scoped>
.app {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
  color: #333;
}

.method {
  text-align: center;
  margin-bottom: 20px;
  color: #555;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 25px;
}

button {
  color: black;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

button:hover {
  background: #e9ecef;
}

button:active {
  transform: translateY(1px);
}

.movie-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
