export const isAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/check", {
        credentials: "include", // Ensure cookies (session) are sent
      });
      return response.ok;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };
  