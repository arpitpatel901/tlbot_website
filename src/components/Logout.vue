<script>
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'LogoutButton',
  setup() {
    const userStore = useUserStore();

    const handleLogout = () => {
      userStore.logout();
      // Redirect to the login page
      router.push('/login');
    };

    return { handleLogout };
  }
}
</script>
