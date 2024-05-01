<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  pageRange: {
    type: Number,
    default: 2
  },
  goButton: {
    type: Boolean,
    default: false
  },
  textBeforeInput: {
    type: String,
    default: 'Go to page'
  },
  textAfterInput: {
    type: String,
    default: 'Go'
  },
  borderActiveColor: {
    type: String,
    default: 'border-indigo-500'
  },
  borderTextActiveColor: {
    type: String,
    default: 'text-[#0CAF60]'
  },
  styled: {
    type: String,
    default: 'simple'
  }
})

const emit = defineEmits(['page-changed'])

const pageInput = ref(1)

const totalPages = computed( () => Math.ceil(props.totalItems / props.perPage))

const paginationFrom = computed(() => (props.currentPage - 1) * props.perPage + 1)

const paginationTo = computed(() => {
  let end = (props.currentPage * props.perPage);
  return props.totalItems < end ? props.totalItems : end;
})

const isFirstPage = computed(() => {
  return props.currentPage === 1
})

const isLastPage = computed(() => {
  return props.currentPage >= totalPages.value
})

// methods
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    emit('page-changed', page)
  }
}

// try
const rangeStart = computed(() => {
  var start = props.currentPage - props.pageRange
  return (start > 0) ? start : 1
})

const rangeEnd = computed(() => {
  var end = (props.currentPage + props.pageRange)
  return (end < totalPages.value) ? end : totalPages.value
})

const hasFirst = () => {
  return rangeStart.value !== 1
}

const hasLast = () => {
  return rangeEnd.value < totalPages.value
}

const calculatedPages = computed(() => {
  var pages = []
  for (var i = rangeStart.value; i <= rangeEnd.value; i++) {
    pages.push(i)
  }
  return pages
})

</script>

<template>
  <div :class="{ 'flex justify-between items-center': goButton }">
    <div :class="{ 'flex justify-between items-center': (props.styled === 'simple') }">
      <nav
        class="relative z-0 inline-flex -space-x-px text-[#A0AEC0]"
        aria-label="Pagination"
        :class="{ 'mb-3': props.styled === 'centered' }"
      >
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          @click.prevent="changePage(currentPage - 1)"
          :class="{ 'cursor-not-allowed bg-gray-200 hover:bg-gray-300': isFirstPage }"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#A0AEC0"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#"
          aria-current="page"
          class="bg-white text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          @click.prevent="changePage(1)"
          v-if="hasFirst()"
        >1</a>
        <span
          class="relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700"
          v-if="hasFirst()"
        >...</span>
        <a
          href="#"
          aria-current="page"
          v-for="(page, index) in calculatedPages"
          :key="index"
          class=" hover:bg-gray-50 rounded-xl relative inline-flex items-center px-4 py-2 text-sm"
          :class="{ [`z-10 bg-[#E7F7EF] text-[#0CAF60] font-bold !${borderActiveColor} !${borderTextActiveColor}`]: currentPage == page }"
          @click.prevent="changePage(page)"
        >{{ page }}</a>
        <!-- :class="currentPage === page ? `z-10 bg-indigo-50 !${borderActiveColor} !${borderTextActiveColor}` : '' }" -->
        <span
          class="relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700"
          v-if="hasLast()"
        >...</span>
        <a
          href="#"
          aria-current="page"
          class="bg-white hover:bg-gray-50 rounded-xl text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          v-if="hasLast()"
          @click.prevent="changePage(totalPages)"
        >{{ totalPages }}</a>
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          @click.prevent="changePage(currentPage + 1)"
          :class="{ 'cursor-not-allowed bg-gray-200 hover:bg-gray-300': isLastPage }"
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#A0AEC0"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </nav>
      <div class="hidden" :class="{ 'order-first': props.styled === 'simple' }">
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ paginationFrom }}</span>
          to
          <span class="font-medium">{{ paginationTo }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
    </div>
    <div v-if="goButton">
      <label
        for="search"
        class="pr-3 text-gray-500 text-xs font-semibold uppercase"
      >{{ textBeforeInput }}</label>
      <input
        type="text"
        placeholder="Page no"
        class="w-28 px-4 py-1 rounded-l outline-none border-t-2 border-l-2 border-b-2 placeholder:text-xs uppercase font-semibold"
        :class="`focus:${borderActiveColor}`"
        v-model="pageInput"
      />
      <button
        class="px-4 py-1.5 rounded-r bg-indigo-500 text-white"
        @click.prevent="changePage(pageInput)"
      >{{ textAfterInput }}</button>
    </div>
  </div>
</template>
