<template>
  <div class="min-h-screen bg-slate-950 px-4 py-16 text-white">
    <div class="mx-auto flex max-w-2xl flex-col items-center text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">403</p>
      <h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Unauthorized</h1>
      <p class="mt-4 max-w-xl text-sm leading-6 text-white/70">
        You do not have permission to access this area. Please sign in with an admin account to continue.
      </p>
      <router-link
        to="/login"
        class="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
      >
        Go to Login
      </router-link>
    </div>
  </div>
</template>
