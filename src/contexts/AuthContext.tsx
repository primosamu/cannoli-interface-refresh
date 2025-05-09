
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type GuestUser = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | GuestUser | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (data: { first_name?: string; last_name?: string; avatar_url?: string }) => Promise<void>;
};

const guestUser: GuestUser = {
  id: "guest-user",
  email: "guest@example.com"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | GuestUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? guestUser);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? guestUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(guestUser);
      toast.success("Logout realizado com sucesso");
    } catch (error: any) {
      toast.error(error.message || "Falha ao realizar logout");
    }
  };

  const updateProfile = async (data: { first_name?: string; last_name?: string; avatar_url?: string }) => {
    try {
      if (!user || user.id === "guest-user") {
        toast.info("Você precisa estar logado para atualizar seu perfil");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso");
    } catch (error: any) {
      toast.error(error.message || "Falha ao atualizar perfil");
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
