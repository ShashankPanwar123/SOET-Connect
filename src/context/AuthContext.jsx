import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);

  }, []);

  const login = (
    token,
    userData
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;