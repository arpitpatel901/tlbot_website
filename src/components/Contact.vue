<template>
  <div>
    <Navbar />
    <div class="contact-container py-16 px-8">
      <h2 class="text-3xl text-center mb-8">Questions or Feedback? We're Listening</h2>
      <form @submit.prevent="sendMessage" class="space-y-6 max-w-xl mx-auto">
        <div>
          <label for="name" class="block text-lg font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-lg font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2"
            required
          />
        </div>
        <div>
          <label for="message" class="block text-lg font-medium">Message</label>
          <textarea
            v-model="form.message"
            id="message"
            rows="4"
            class="mt-1 block w-full h-40 border-gray-300 text-black text-l rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2 pt-2"
            required
          ></textarea>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
      </form>
      <p v-if="submitted" class="mt-6 text-center text-green-600">
        Thank you! Your message has been sent.
      </p>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      submitted: false,
    };
  },
  methods: {
    async sendMessage() {
      const formData = {
        name: this.form.name,
        email: this.form.email,
        message: this.form.message
      };

      try {
        const response = await fetch('http://localhost:3001/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          this.submitted = true;
          this.form.name = '';
          this.form.email = '';
          this.form.message = '';
        } else {
          console.error('Form submission failed.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  },
};
</script>

<style scoped>
.contact-container {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
