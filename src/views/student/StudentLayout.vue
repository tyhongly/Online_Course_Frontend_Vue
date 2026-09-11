<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import {
  BookOpen,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
} from "lucide-vue-next";
import { authStore } from "../../store/authStore.js";
import DashboardHeader from "../../components/dashboard/DashboardHeader.vue";

const router = useRouter();
const route = useRoute();

const goHome = () => {
  router.push("/");
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const navigation = [
  { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { name: "My Learning", path: "/student/my-courses", icon: BookOpen },
  { name: "Wishlist", path: "/student/wishlist", icon: Heart },
];

const userInitials = computed(() => {
  const name = authStore.user?.name || "Student";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
});
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] text-slate-900 md:overflow-hidden">
    <div
      class="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col md:block"
    >
      <aside
        class="border-b border-slate-200/80 bg-white md:fixed md:inset-y-0 md:left-0 md:flex md:w-[286px] md:flex-col md:border-b-0 md:border-r"
      >
        <div class="flex items-center gap-2">
          <BrandLogo size="lg" cl /><span
            class="font-heading text-2xl font-bold text-dark"
            >TosRean</span
          >
        </div>
        <div
          class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
        >
          STUDENT SPACE
        </div>

        <nav class="flex flex-1 flex-col gap-1 px-4 pb-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            :class="[
              'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition',
              route.path.startsWith(item.path)
                ? 'bg-[#ebe9ff] text-[#5b4ce1]'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
            ]"
          >
            <component :is="item.icon" class="h-4 w-4 shrink-0" />
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <div class="border-t border-slate-200 p-4 space-y-3">
          <button
            @click="goHome"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            <Home class="h-4 w-4" />
            Back to Home
          </button>

          <button
            @click="logout"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <LogOut class="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div class="min-w-0 md:ml-[286px]">
        <DashboardHeader profile-route="/student/profile" />
        <main
          class="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-8 md:h-[calc(100vh-5rem)] md:px-8 md:pb-8"
        >
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
