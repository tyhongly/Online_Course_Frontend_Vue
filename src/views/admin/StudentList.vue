<script setup>
import { computed, ref } from 'vue';
import { Eye, PencilLine, Lock } from 'lucide-vue-next';
import { usersStore } from '../../store/usersStore.js';

const roleOptions = ['Student', 'Instructor', 'Admin'];
const roleDialogOpen = ref(false);
const selectedUser = ref(null);
const draftRole = ref('Student');
const statusDialogOpen = ref(false);
const selectedStatusUser = ref(null);

const users = computed(() =>
  usersStore.users
    .filter((user) => user.role !== 'guest')
    .map((user) => {
      const normalizedRole = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student';
      const joined = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      const statusValue = user.status || (user.lastActivityAt ? 'Active' : 'Suspended');

      return {
        ...user,
        roleLabel: normalizedRole,
        roleClass:
          normalizedRole === 'Student'
            ? 'bg-stone-100 text-stone-700 border border-stone-200'
            : normalizedRole === 'Instructor'
              ? 'bg-orange-100 text-orange-700 border border-orange-200'
              : 'bg-indigo-100 text-indigo-700 border border-indigo-200',
        status: statusValue,
        statusClass:
          statusValue === 'Suspended'
            ? 'bg-rose-100 text-rose-700 border border-rose-200'
            : 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        progress: user.role === 'student' ? 78 : user.role === 'admin' ? null : 35,
        joined,
      };
    }),
);

const getProgressStyle = (value) => ({ width: `${value}%` });

const actionButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700';

const openRoleDialog = (user) => {
  selectedUser.value = user;
  draftRole.value = user.roleLabel;
  roleDialogOpen.value = true;
};

const closeRoleDialog = () => {
  roleDialogOpen.value = false;
  selectedUser.value = null;
};

const saveRole = () => {
  if (!selectedUser.value) return;

  const roleMap = {
    Student: 'student',
    Instructor: 'instructor',
    Admin: 'admin',
  };

  usersStore.updateUser(selectedUser.value.id, { role: roleMap[draftRole.value] || 'student' });
  closeRoleDialog();
};

const openStatusDialog = (user) => {
  selectedStatusUser.value = user;
  statusDialogOpen.value = true;
};

const closeStatusDialog = () => {
  statusDialogOpen.value = false;
  selectedStatusUser.value = null;
};

const currentStatusLabel = computed(() => selectedStatusUser.value?.status || 'Active');

const toggleUserStatus = () => {
  if (!selectedStatusUser.value) return;

  const nextStatus = currentStatusLabel.value === 'Suspended' ? 'Active' : 'Suspended';
  usersStore.updateUser(selectedStatusUser.value.id, { status: nextStatus });
  closeStatusDialog();
};
</script>

<template>
  <div class="min-h-full bg-grey-300 p-5 sm:p-8">
    <div class="mx-auto max-w-6xl">
      <div class="mb-5">
        <h1 class="text-[2.1rem] font-semibold tracking-[-0.03em] text-slate-800">Users</h1>
        <p class="mt-2 text-sm text-slate-500">{{ users.length }} accounts</p>
      </div>

      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_-24px_rgba(15,23,42,0.2)]">
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-left">
            <thead>
              <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th class="px-4 py-3.5 font-medium">Name</th>
                <th class="px-4 py-3.5 font-medium">Email</th>
                <th class="px-4 py-3.5 font-medium">Role</th>
                <th class="px-4 py-3.5 font-medium">Progress</th>
                <th class="px-4 py-3.5 font-medium">Status</th>
                <th class="px-4 py-3.5 font-medium">Joined</th>
                <th class="px-4 py-3.5  text-right">&nbsp;</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-200 text-sm text-slate-700">
              <tr v-for="user in users" :key="user.id" class="align-middle hover:bg-slate-50">
                <td class="px-4 py-4 font-medium text-slate-800">{{ user.name }}</td>
                <td class="px-4 py-4 text-slate-600">{{ user.email }}</td>
                <td class="px-4 py-4">
                  <button
                    type="button"
                    :class="['inline-flex rounded-md px-2.5 py-1 text-xs font-medium', user.roleClass]"
                    @click="openRoleDialog(user)"
                  >
                    {{ user.roleLabel }}
                  </button>
                </td>
                <td class="px-4 py-4">
                  <div v-if="user.progress !== null" class="flex items-center gap-3">
                    <div class="h-2.5 w-24 overflow-hidden rounded-full bg-slate-200">
                      <div
                        class="h-full rounded-full bg-[#4d82d8]"
                        :style="getProgressStyle(user.progress)"
                      />
                    </div>
                    <span class="text-xs font-medium text-slate-700">{{ user.progress }}%</span>
                  </div>
                  <span v-else class="text-slate-400">—</span>
                </td>
                <td class="px-4 py-4">
                  <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-medium', user.statusClass]">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-4 py-4 text-slate-600">{{ user.joined }}</td>
                <td class="px-4 py-4">
                  <div class="flex justify-end gap-2">
                    <button type="button" :class="actionButtonClass" aria-label="Change role" @click="openRoleDialog(user)">
                      <Eye class="h-4 w-4" />
                    </button>
                    <button type="button" :class="actionButtonClass" aria-label="Edit user">
                      <PencilLine class="h-4 w-4" />
                    </button>
                    <button type="button" :class="actionButtonClass" aria-label="Suspend user" @click="openStatusDialog(user)">
                      <Lock class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="roleDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_60px_-30px_rgba(15,23,42,0.4)]">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-slate-800">Change role</h2>
            <button type="button" class="text-xl text-slate-500 hover:text-slate-700" @click="closeRoleDialog">×</button>
          </div>

          <div class="space-y-2">
            <label
              v-for="option in roleOptions"
              :key="option"
              class="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition"
              :class="draftRole === option ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'"
            >
              <span class="font-medium text-slate-700">{{ option }}</span>
              <input v-model="draftRole" :value="option" type="radio" class="h-4 w-4 accent-sky-600" />
            </label>
          </div>

          <div class="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
            <span class="text-sm text-slate-500">Current</span>
            <span class="inline-flex rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              {{ selectedUser?.roleLabel || 'Student' }}
            </span>
          </div>

          <div class="mt-5 flex justify-end gap-2">
            <button type="button" class="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50" @click="closeRoleDialog">
              Cancel
            </button>
            <button type="button" class="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700" @click="saveRole">
              Save
            </button>
          </div>
        </div>
      </div>

      <div v-if="statusDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_60px_-30px_rgba(15,23,42,0.4)]">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-slate-800">
              {{ currentStatusLabel === 'Suspended' ? 'Unsuspend user' : 'Suspend user' }}
            </h2>
            <button type="button" class="text-xl text-slate-500 hover:text-slate-700" @click="closeStatusDialog">×</button>
          </div>

          <p class="text-sm leading-6 text-slate-600">
            Change <span class="font-semibold text-slate-800">{{ selectedStatusUser?.name || 'this user' }}</span> status to
            <span :class="currentStatusLabel === 'Suspended' ? 'font-semibold text-emerald-700' : 'font-semibold text-rose-700'">
              {{ currentStatusLabel === 'Suspended' ? 'Active' : 'Suspended' }}
            </span>?
          </p>

          <div class="mt-5 flex justify-end gap-2">
            <button type="button" class="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50" @click="closeStatusDialog">
              Cancel
            </button>
            <button
              type="button"
              :class="currentStatusLabel === 'Suspended' ? 'rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500' : 'rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500'"
              @click="toggleUserStatus"
            >
              {{ currentStatusLabel === 'Suspended' ? 'Unsuspend' : 'Suspend' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
