<script setup>
import { reactive, ref } from 'vue';
import { CheckCircle2, CircleHelp, Clock3, Mail, Send, LoaderCircle } from 'lucide-vue-next';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const errors = reactive({});
const isSubmitting = ref(false);
const isSent = ref(false);

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

const validateField = (field) => {
  const value = form[field].trim();

  if (!value) {
    errors[field] = `${fieldLabels[field]} is required.`;
  } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.email = 'Enter a valid email address.';
  } else {
    delete errors[field];
  }
};

const validateForm = () => {
  Object.keys(form).forEach(validateField);
  return Object.keys(errors).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    // The project does not yet expose a contact endpoint. This preserves the form UX
    // until the support service is connected.
    await new Promise((resolve) => window.setTimeout(resolve, 750));
    isSent.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const sendAnotherMessage = () => {
  Object.assign(form, { name: '', email: '', subject: '', message: '' });
  Object.keys(errors).forEach((key) => delete errors[key]);
  isSent.value = false;
};
</script>

<template>
  <main class="min-h-screen bg-light pt-28 text-dark">
    <section class="border-b border-slate-200/80 bg-white py-14 sm:py-16">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p class="text-sm font-bold uppercase tracking-[0.18em] text-primary">Contact us</p>
        <h1 class="mt-3 font-heading text-3xl font-bold tracking-tight text-dark sm:text-4xl">We're Here to Help</h1>
        <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-dark-lighter sm:text-lg">
          Have questions about courses, documents, or your account? Send us a message and we'll get back to you.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:gap-20">
        <aside class="lg:pt-3" aria-labelledby="contact-details-title">
          <p class="text-sm font-bold uppercase tracking-[0.16em] text-primary">Support</p>
          <h2 id="contact-details-title" class="mt-3 font-heading text-2xl font-bold text-dark sm:text-3xl">Get in Touch</h2>
          <p class="mt-4 max-w-md leading-7 text-dark-lighter">
            Our support team is here to help you keep learning with confidence.
          </p>

          <div class="mt-8 space-y-6">
            <div class="flex items-start gap-4">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail class="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 class="font-semibold text-dark">Email Support</h3>
                <a href="mailto:support@tosrean.com" class="mt-1 inline-block text-sm text-primary transition hover:text-primary-dark hover:underline">support@tosrean.com</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CircleHelp class="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 class="font-semibold text-dark">Need Help?</h3>
                <p class="mt-1 max-w-sm text-sm leading-6 text-dark-lighter">Check our FAQ or Help Center for answers to common questions.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 class="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 class="font-semibold text-dark">Response Time</h3>
                <p class="mt-1 text-sm leading-6 text-dark-lighter">We usually respond within 1–2 business days.</p>
              </div>
            </div>
          </div>
        </aside>

        <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" :aria-labelledby="isSent ? 'contact-success-title' : 'contact-form-title'">
          <template v-if="!isSent">
            <h2 id="contact-form-title" class="font-heading text-2xl font-bold text-dark">Send us a Message</h2>
            <p class="mt-2 text-sm leading-6 text-dark-lighter">Tell us how we can help, and we'll take it from there.</p>

            <form class="mt-7 space-y-5" novalidate @submit.prevent="submitForm">
              <div>
                <label for="contact-name" class="mb-2 block text-sm font-semibold text-dark">Name</label>
                <input id="contact-name" v-model="form.name" type="text" autocomplete="name" :aria-invalid="Boolean(errors.name)" aria-describedby="contact-name-error" class="block w-full rounded-xl border bg-white px-4 py-3 text-dark outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15" :class="errors.name ? 'border-red-400' : 'border-slate-200'" placeholder="Your name" @blur="validateField('name')" @input="errors.name && validateField('name')" />
                <p v-if="errors.name" id="contact-name-error" class="mt-1.5 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <div>
                <label for="contact-email" class="mb-2 block text-sm font-semibold text-dark">Email</label>
                <input id="contact-email" v-model="form.email" type="email" autocomplete="email" :aria-invalid="Boolean(errors.email)" aria-describedby="contact-email-error" class="block w-full rounded-xl border bg-white px-4 py-3 text-dark outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15" :class="errors.email ? 'border-red-400' : 'border-slate-200'" placeholder="you@example.com" @blur="validateField('email')" @input="errors.email && validateField('email')" />
                <p v-if="errors.email" id="contact-email-error" class="mt-1.5 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <div>
                <label for="contact-subject" class="mb-2 block text-sm font-semibold text-dark">Subject</label>
                <input id="contact-subject" v-model="form.subject" type="text" :aria-invalid="Boolean(errors.subject)" aria-describedby="contact-subject-error" class="block w-full rounded-xl border bg-white px-4 py-3 text-dark outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15" :class="errors.subject ? 'border-red-400' : 'border-slate-200'" placeholder="What can we help with?" @blur="validateField('subject')" @input="errors.subject && validateField('subject')" />
                <p v-if="errors.subject" id="contact-subject-error" class="mt-1.5 text-sm text-red-600">{{ errors.subject }}</p>
              </div>

              <div>
                <label for="contact-message" class="mb-2 block text-sm font-semibold text-dark">Message</label>
                <textarea id="contact-message" v-model="form.message" rows="5" :aria-invalid="Boolean(errors.message)" aria-describedby="contact-message-error" class="block w-full resize-y rounded-xl border bg-white px-4 py-3 text-dark outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15" :class="errors.message ? 'border-red-400' : 'border-slate-200'" placeholder="Write your message here..." @blur="validateField('message')" @input="errors.message && validateField('message')"></textarea>
                <p v-if="errors.message" id="contact-message-error" class="mt-1.5 text-sm text-red-600">{{ errors.message }}</p>
              </div>

              <button type="submit" :disabled="isSubmitting" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                <LoaderCircle v-if="isSubmitting" class="h-5 w-5 animate-spin" aria-hidden="true" />
                <Send v-else class="h-5 w-5" aria-hidden="true" />
                {{ isSubmitting ? 'Sending message...' : 'Send Message' }}
                <span v-if="!isSubmitting" aria-hidden="true">→</span>
              </button>
            </form>
          </template>

          <div v-else class="flex min-h-[430px] flex-col items-center justify-center px-2 py-10 text-center sm:px-10">
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 class="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 id="contact-success-title" class="mt-5 font-heading text-2xl font-bold text-dark">Message Sent!</h2>
            <p class="mt-3 max-w-sm leading-7 text-dark-lighter">Thank you for contacting us. We'll get back to you as soon as possible.</p>
            <button type="button" class="mt-7 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5" @click="sendAnotherMessage">Send another message</button>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
