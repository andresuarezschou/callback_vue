<template>
  <div class="table-responsive">
    <table class="tutorial-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Published</th>
          <th>Created At</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tutorial in tutorials" :key="tutorial.id">
          <td>{{ tutorial.id }}</td>
          <td>{{ tutorial.title }}</td>
          <td>{{ tutorial.description }}</td>
          <td>{{ tutorial.published ? "Yes" : "No" }}</td>
          <td>{{ formatDate(tutorial.createdAt) }}</td>
        </tr>

        <tr v-if="tutorials.length === 0">
          <td colspan="5">No data available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TutorialTable",

  props: {
    tutorials: {
      type: Array,
      required: true,
    },
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped>
.table-responsive {
  width: 100%;
  margin-top: 10px;
}

.tutorial-table {
  border-collapse: collapse;
  width: 100%;
  color: black;
  font-size: 13px; /* Slightly smaller text so it fits better on mobile */
}

.tutorial-table th,
.tutorial-table td {
  border: 1px solid #333;
  padding: 6px 4px; /* Tighter padding for mobile */
  text-align: left;
  background-color: white;
  word-break: break-word; /* Allows long text to wrap instead of overflowing */
}

.tutorial-table th {
  background-color: green;
  color: white;
  font-size: 12px;
}

tr:nth-child(even) td {
  background-color: #fafafa;
}

tr:hover td {
  background-color: #f5f5f5;
}
</style>
