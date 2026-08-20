<script setup>
import { instructors } from '../data/index.js';
import InstructorCard from './InstructorCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Pagination, Navigation];
</script>

<template>
  <section class="py-20 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Top Instructors</span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">Our Top Class & Professional Instructors in One Place</h2>
      </div>

      <div class="px-8 md:px-12 relative instructor-slider">
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="30"
          :pagination="{ clickable: true }"
          :navigation="true"
          :breakpoints="{
            '640': { slidesPerView: 2, spaceBetween: 20 },
            '768': { slidesPerView: 3, spaceBetween: 30 },
            '1024': { slidesPerView: 4, spaceBetween: 30 },
          }"
          class="pb-16"
        >
          <swiper-slide v-for="instructor in instructors" :key="instructor.id">
            <InstructorCard :instructor="instructor" />
          </swiper-slide>
        </swiper>
      </div>

    </div>
  </section>
</template>

<style>
/* Custom Swiper Styles */
.instructor-slider .swiper-button-next,
.instructor-slider .swiper-button-prev {
  background-color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  color: #0f172a;
}
.instructor-slider .swiper-button-next:hover,
.instructor-slider .swiper-button-prev:hover {
  background-color: #6366f1;
  color: white;
}
.instructor-slider .swiper-button-next::after,
.instructor-slider .swiper-button-prev::after {
  font-size: 20px;
  font-weight: bold;
}

.instructor-slider .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: #cbd5e1;
  opacity: 1;
}
.instructor-slider .swiper-pagination-bullet-active {
  background: #6366f1;
  width: 24px;
  border-radius: 5px;
}
</style>
