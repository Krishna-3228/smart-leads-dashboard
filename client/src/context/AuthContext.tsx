import {
    createContext,
    useContext,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";

type AuthContextType = {
    token: string | null;

    user: User | null;

    login: (
        token: string,
        user: User
    ) => void;

    logout: () => void;

    updateUser: (user: User) => void;
};

const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [token, setToken] = useState<
        string | null
    >(
        localStorage.getItem("token")
    );

    const [user, setUser] =
        useState<User | null>(() => {
            try {
                const storedUser =
                    localStorage.getItem("user");

                return storedUser
                    ? JSON.parse(storedUser)
                    : null;
            } catch {
                localStorage.removeItem("user");

                return null;
            }
        });

    const login = (
        token: string,
        user: User
    ) => {
        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);

        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setToken(null);

        setUser(null);
    };

    const updateUser = (updatedUser: User) => {
        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};