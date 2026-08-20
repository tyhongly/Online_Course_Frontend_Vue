import { ref, onMounted, onUnmounted } from 'vue';

export function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const target = ref(null);
  const isVisible = ref(false);

  let observer;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        if (options.triggerOnce && target.value) {
          observer.unobserve(target.value);
        }
      } else {
        if (!options.triggerOnce) {
          isVisible.value = false;
        }
      }
    }, options);

    if (target.value) {
      observer.observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value);
    }
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    target,
    isVisible
  };
}
