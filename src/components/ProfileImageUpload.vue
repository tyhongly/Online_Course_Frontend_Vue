<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Camera, X } from "lucide-vue-next";

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select", "remove"]);

const previewUrl = ref(props.image);
const error = ref("");
const isPreviewOpen = ref(false);
let objectUrl = "";

const initials = computed(() =>
  (props.name.trim().charAt(0) || "U").toUpperCase(),
);

const clearObjectUrl = () => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = "";
  }
};

watch(
  () => props.image,
  (image) => {
    if (!objectUrl) {
      previewUrl.value = image;
    }
  },
);

const selectImage = (event) => {
  const [file] = event.target.files || [];

  event.target.value = "";

  if (!file) return;

  const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!supportedTypes.includes(file.type)) {
    error.value = "Choose a JPG, PNG, or WEBP image.";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    error.value = "Image must be 5MB or smaller.";
    return;
  }

  clearObjectUrl();

  objectUrl = URL.createObjectURL(file);
  previewUrl.value = objectUrl;
  error.value = "";

  emit("select", file);
};

const removeImage = () => {
  clearObjectUrl();
  previewUrl.value = "";
  error.value = "";

  emit("remove");
};

const openPreview = () => {
  if (previewUrl.value) {
    isPreviewOpen.value = true;
  }
};

const closePreview = () => {
  isPreviewOpen.value = false;
};

const onKeydown = (event) => {
  if (event.key === "Escape") {
    closePreview();
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  clearObjectUrl();
});

const fileInput = ref(null);

function triggerFileInput() {
  fileInput.value?.click();
}

defineExpose({
  openPreview,
  triggerFileInput,
});
</script>

<template>
  <!-- Avatar only: NO white square wrapper -->
  <section class="inline-block">
    <button
      type="button"
      class="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-visible rounded-full bg-primary text-3xl font-semibold text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      @click="triggerFileInput"
      aria-label="Upload profile picture"
    >
      <!-- Profile image -->
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Profile picture"
        class="h-full w-full rounded-full object-cover"
      />

      <!-- Fallback initial -->
      <span
        v-else
        class="flex h-full w-full items-center justify-center rounded-full text-3xl font-bold"
      >
        {{ initials }}
      </span>

      <!-- Camera button -->
      <span
        class="absolute -bottom-0 -right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md"
      >
        <Camera class="h-4 w-4" />
      </span>
    </button>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
      class="sr-only"
      @change="selectImage"
    />
  </section>

  <!-- Image preview modal -->
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
        <!-- Close button -->
        <button
          type="button"
          class="absolute -right-2 -top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Close image preview"
          @click="closePreview"
        >
          <X class="h-5 w-5" />
        </button>

        <!-- Preview image -->
        <img
          :src="previewUrl"
          alt="Profile picture"
          class="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />
      </div>
    </div>
  </Teleport>
</template>
