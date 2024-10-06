<template>
  <div
    class="unauthorized flex items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p class="text-lg">
        Your email is not authorized to access this application.
      </p>
      <p class="mt-2">
        Please contact support if you believe this is a mistake.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>
