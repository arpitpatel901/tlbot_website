<template>
  <div>
    <Navbar />
    <div class="protected-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

export default {
  name: "ProtectedLayout",
  components: {
    Navbar,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    if (!userStore.user) {
      router.push("/");
    }

    return {};
  },
};
</script>

<style scoped>
.protected-content {
  padding: 20px;
}
</style>
