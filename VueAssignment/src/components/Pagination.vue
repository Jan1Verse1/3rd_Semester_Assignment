<template>
    <ul class="pagination-container">
      <!-- Left navigation arrow -->
      <li
        :class="['pagination-item', { disabled: currentPage === 1 }]"
        @click="onPrevious"
      >
        <div class="arrow left" />
      </li>
      <li
        v-for="pageNumber in paginationRange"
        :key="pageNumber"
        :class="['pagination-item', { selected: pageNumber === currentPage }]"
        @click="() => onPageChange(pageNumber)"
      >
        <span v-if="pageNumber === DOTS">&#8230;</span>
        <span v-else>{{ pageNumber }}</span>
      </li>
      <!-- Right navigation arrow -->
      <li
        :class="['pagination-item', { disabled: currentPage === lastPage }]"
        @click="onNext"
      >
        <div class="arrow right" />
      </li>
    </ul>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  const DOTS = "...";
  
  const range = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  
  export default {
    props: {
      totalCount: {
        type: Number,
        required: true,
      },
      pageSize: {
        type: Number,
        required: true,
      },
      siblingCount: {
        type: Number,
        default: 1,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    },
    setup(props, { emit }) {
      const currentPage = ref(props.currentPage);
  
      const paginationRange = computed(() => {
        const totalPageCount = Math.ceil(props.totalCount / props.pageSize);
  
        const totalPageNumbers = props.siblingCount + 5;
  
        if (totalPageNumbers >= totalPageCount) {
          return range(1, totalPageCount);
        }
  
        const leftSiblingIndex = Math.max(currentPage.value - props.siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage.value + props.siblingCount, totalPageCount);
  
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
  
        if (!shouldShowLeftDots && shouldShowRightDots) {
          let leftItemCount = 3 + 2 * props.siblingCount;
          let leftRange = range(1, leftItemCount);
  
          return [...leftRange, DOTS, totalPageCount];
        }
  
        if (shouldShowLeftDots && !shouldShowRightDots) {
          let rightItemCount = 3 + 2 * props.siblingCount;
          let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
          return [firstPageIndex, DOTS, ...rightRange];
        }
  
        if (shouldShowLeftDots && shouldShowRightDots) {
          let middleRange = range(leftSiblingIndex, rightSiblingIndex);
          return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
      });
  
      const onPageChange = (pageNumber) => {
        if (pageNumber !== DOTS) {
          currentPage.value = pageNumber;
          emit('pageChange', pageNumber);
        }
      };
  
      const onNext = () => {
        if (currentPage.value < Math.ceil(props.totalCount / props.pageSize)) {
          currentPage.value += 1;
          emit('pageChange', currentPage.value);
        }
      };
  
      const onPrevious = () => {
        if (currentPage.value > 1) {
          currentPage.value -= 1;
          emit('pageChange', currentPage.value);
        }
      };
  
      return {
        DOTS,
        paginationRange,
        currentPage,
        onNext,
        onPrevious,
        onPageChange,
      };
    },
  };
  </script>
  
  
  <style scoped>
  .pagination-container {
    display: flex;
    list-style: none;
  }
  
  .pagination-item {
    margin: 0 5px;
    cursor: pointer;
  }
  
  .pagination-item.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  .pagination-item.selected {
    font-weight: bold;
  }
  
  
  </style>
  