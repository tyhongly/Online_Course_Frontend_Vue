<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ImagePlus, Trash2, X } from 'lucide-vue-next';

const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['select', 'remove']);

const previewUrl = ref(props.image);
const error = ref('');
const isPreviewOpen = ref(false);
let objectUrl = '';

const initials = computed(() => (props.name.trim().charAt(0) || 'U').toUpperCase());

const clearObjectUrl = () => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = '';
  }
};

watch(
  () => props.image,
  (image) => {
    if (!objectUrl) previewUrl.value = image;
  }
);

const selectImage = (event) => {
  const [file] = event.target.files || [];
  event.target.value = '';
  if (!file) return;

  const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!supportedTypes.includes(file.type)) {
    error.value = 'Choose a JPG, PNG, or WEBP image.';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image must be 5MB or smaller.';
    return;
  }

  clearObjectUrl();
  objectUrl = URL.createObjectURL(file);
  previewUrl.value = objectUrl;
  error.value = '';
  emit('select', file);
};

const removeImage = () => {
  clearObjectUrl();
  previewUrl.value = '';
  error.value = '';
  emit('remove');
};

const openPreview = () => {
  if (previewUrl.value) isPreviewOpen.value = true;
};

const closePreview = () => {
  isPreviewOpen.value = false;
};

const onKeydown = (event) => {
  if (event.key === 'Escape') closePreview();
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  clearObjectUrl();
});

defineExpose({ openPreview });
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      <button
        v-if="previewUrl"
        type="button"
        class="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="View profile picture"
        @click="openPreview"
      >
        <img v-if="previewUrl" :src="previewUrl" alt="Profile picture preview" class="h-full w-full object-cover" />
        <span class="absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/15"></span>
      </button>
      <div v-else class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-semibold text-white shadow-sm">
        <span>{{ initials }}</span>
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-semibold text-slate-900">Profile picture</h2>
        <p class="mt-1 text-sm text-slate-500">JPG, PNG or WEBP. Maximum 5MB.</p>
        <p v-if="error" class="mt-2 text-sm font-medium text-red-600" role="alert">{{ error }}</p>

        <div class="mt-3 flex flex-wrap gap-3">
          <label class="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
            <ImagePlus class="h-4 w-4" />
            {{ previewUrl ? 'Replace Image' : 'Choose Image' }}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              class="sr-only"
              @change="selectImage"
            />
          </label>
          <button
            v-if="previewUrl"
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            @click="removeImage"
          >
            <Trash2 class="h-4 w-4" />
            Remove Image
          </button>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="isPreviewOpen && previewUrl"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Profile picture preview"
      @click.self="closePreview"
    >
      <div class="relative max-h-full max-w-3xl">
        <button
          type="button"
          class="absolute -right-2 -top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Close image preview"
          @click="closePreview"
        >
          <X class="h-5 w-5" />
        </button>
        <img
          :src="previewUrl"
          alt="Profile picture"
          class="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />
      </div>
    </div>
  </Teleport>
</template>
