<template>
    <div class="card">
      <h1 class="repoName">{{ name }}</h1>
      <div class="flex justify-between">
        <h4 class="mb-5 h-10 w-max px-6 font-semibold rounded-full justify-center place-content-center bg-green-100 border-slate-00 text-slate-900">
          {{ visibility }}
        </h4>
        <h4 class="mb-5 h-10 w-max px-6 font-semibold rounded-full justify-center place-content-center bg-cyan-700 text-cyan-300">
          {{ language }}
        </h4>
      </div>
      <p class="date">Last Updated: {{ new Date(updatedAt).toLocaleDateString() }}</p>
      <div class="mt-10">
        <a
          class="t-[200px] hover:cursor-pointer rounded-xl bg-cyan-900 p-2 text-white text-base"
          :href="htmlUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          See More
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RepoCard",
    props: {
      name: String,
      visibility: String,
      updatedAt: String,
      language: String,
      htmlUrl: String
    }
  };
  </script>
  
  <style scoped>
  @import "@/styles/RepoCard.css";
  </style>
  