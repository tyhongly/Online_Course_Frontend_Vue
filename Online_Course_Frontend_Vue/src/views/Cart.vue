<script setup>
import { cartStore, cartTotal } from '../store/cartStore.js';
</script>

<template>
  <main class="bg-gray-50 min-h-screen py-28">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div v-if="cartStore.items.length === 0" class="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
        <p class="text-gray-500 mb-5">Your cart is empty.</p>
        <router-link to="/courses" class="inline-flex bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark">
          Browse Courses
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div v-for="course in cartStore.items" :key="course.id" class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
          <img :src="course.image" :alt="course.title" class="w-28 h-20 object-cover rounded-lg" />
          <div class="flex-grow">
            <router-link :to="`/course/${course.id}`" class="font-bold text-gray-800 hover:text-primary">{{ course.title }}</router-link>
            <p class="text-primary font-bold mt-1">${{ course.price }}</p>
          </div>
          <button @click="cartStore.remove(course.id)" class="text-red-500 font-medium hover:text-red-700">Remove</button>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <span class="text-xl font-bold text-gray-800">Total: ${{ cartTotal }}</span>
          <button class="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark">Checkout</button>
        </div>
      </div>
    </div>
  </main>
</template>