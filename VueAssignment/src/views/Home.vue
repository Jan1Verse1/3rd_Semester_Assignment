<template>
    <div>
      <!-- Header -->
      <div class="bg-slate-900 w-screen">
        <nav class="p-4 flex justify-between items-center">
          <router-link
            class="flex row items-center shadow hover:shadow-lg active:shadow-xl p-4 rounded-xl transition duration-150 ease-in-out cursor-pointer"
            to="/"
          >
            <div v-if="profileData">
              <img
                :src="profileData.avatar_url"
                alt="My GitHub Avatar"
                class="h-12 w-12 rounded-full mr-2"
              />
            </div>
            <h4 class="text-white text-lg">Jan1Verse1</h4>
          </router-link>
        </nav>
 
      </div>
  
      <!-- Head -->
      <div class="p-6">
        <img src="" alt="" />
        <div class="typing-demo">
          <p class="text-4xl mt-10 mb-10 md:text-6xl lg:text-8xl">{{ text1 }}</p>
          <p class="text-2xl">
            <span class="inline-block text-md md:text-2xl lg:text-3xl" v-html="text2" />
          </p>
          <div v-if="typingComplete" class="mt-10">
            <a
              class="t-[200px] hover:cursor-pointer rounded-xl border-2 border-cyan-900 p-2 hover:bg-cyan-900 hover:text-white hover:border-2 text-2xl"
              href="https://github.com/Jan1Verse1"
              target="_blank"
            >
              My Résumé
            </a>
          </div>
        </div>
      </div>
  
      <!-- Repos -->
      <div class="width-auto p-10 max-w-6xl flex-col justify-between items-center">
        <h3 class="text-xl font-semibold mb-4">My Repositories</h3>
        <div class="mb-4 justify-end mt-6 sm:flex-col">
          <input
            type="text"
            placeholder="Search repositories..."
            v-model="searchQuery"
            class="px-4 py-2 border border-gray-300 rounded-md mr-2"
          />
          <select v-model="filterLanguage" class="px-4 py-2 border border-gray-300 rounded-md">
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Shell">Shell</option>
          </select>
        </div>
        <div class="w-screen  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <RepoCard
            v-for="repo in paginatedRepos"
            :key="repo.id"
            :name="repo.name"
            :visibility="repo.visibility"
            :language="repo.language"
            :updatedAt="repo.updated_at"
            :htmlUrl="repo.html_url"
          />
        </div>
        <div class="flex justify-end mt-6">
          <Pagination
            :currentPage="currentPage"
            :totalCount="filteredRepos.length"
            :pageSize="repoSize"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  // import MyModal from './modals/MyModal.vue';
  import Pagination from '@/components/Pagination.vue';
  import RepoCard from '@/components/RepoCard.vue';
  
  export default {
    name: 'Home',
    components: {
      // MyModal,
      Pagination,
      RepoCard
    },
    data() {
      return {
        profileData: null,
        // showModal: false,
        text1: 'Hello...',
        text2: '',
        typingComplete: false,
        fullText: `I am <span style="color:#2b7bd7;"> Oluwaseyi Adedotun </span>, a <span class="blue-text"> Frontend Developer </span> with over 1 year experience proficiently building software with the following frontend technologies, <span class="blue-text">Javascript, React.js, Redux, Bootstrap, Tailwind CSS and others.</span> I believe in the principle of constant improvement and I am always trying to upskill by learning new technologies to add to my stack!`,
        repos: [],
        searchQuery: '',
        filterLanguage: '',
        currentPage: 1,
        repoSize: 12,
        GITHUB_TOKEN: import.meta.env.VITE_GITHUB_PERSONAL_TOKEN
      };
    },
    created() {
        console.log('GITHUB_TOKEN:', this.GITHUB_TOKEN); // Log the token to ensure it's being set
      this.fetchGitHubProfile();
      this.typeText();
      this.fetchGitHubRepos();
    },
    methods: {
      async fetchGitHubProfile() {
        try {
          const response = await axios.get('https://api.github.com/users/Jan1Verse1');
          this.profileData = response.data;
        } catch (error) {
          console.error('Error fetching GitHub profile:', error);
        }
      },
    //   openModal() {
    //     this.showModal = true;
    //   },
    //   closeModal() {
    //     this.showModal = false;
    //   },
      typeText() {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex <= this.fullText.length) {
            this.text2 = this.fullText.substring(0, currentIndex);
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            this.typingComplete = true;
          }
        }, 25);
      },
      async fetchGitHubRepos() {
      
          try {
        const config = {
          headers: {
            // Authorization: `Bearer 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`, 
            Authorization: `Bearer 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`, 
          },
        };
          const response = await axios.get(`https://api.github.com/users/Jan1Verse1/repos`, config);
          this.repos = response.data;
        } catch (error) {
          console.error('Error fetching GitHub repos:', error);
        }
      },
      handlePageChange(page) {
        this.currentPage = page;
      }
    },
    computed: {
      filteredRepos() {
        return this.repos.filter(repo => {
          const matchesSearch = repo.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesLanguage = !this.filterLanguage || repo.language === this.filterLanguage;
          return matchesSearch && matchesLanguage;
        });
      },
      paginatedRepos() {
        const start = (this.currentPage - 1) * this.repoSize;
        const end = start + this.repoSize;
        return this.filteredRepos.slice(start, end);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any scoped CSS here */
  </style>
  