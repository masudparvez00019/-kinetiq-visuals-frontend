"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Sparkles, Eye, EyeOff, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Demo credentials that match the seeded admin user in the backend.
// Update these if your seed admin uses different values.
const DEMO_CREDENTIALS = {
  email: "admin@kinetiqvisuals.com",
  password: "ChangeMe_Str0ng!2026",
};

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const rememberValue = watch("remember");

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      authService.persistSession(response, Boolean(data.remember));

      // Single-admin app: drop authenticated users into the admin dashboard.
      router.replace("/admin");
    } catch (error) {
      setServerError(getErrorMessage(error, "Invalid email or password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    if (isSubmitting) return;
    setServerError(null);
    setValue("email", DEMO_CREDENTIALS.email, { shouldValidate: true });
    setValue("password", DEMO_CREDENTIALS.password, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="glass-card-glow relative overflow-hidden rounded-2xl p-8 shadow-2xl sm:p-10">
        {/* Decorative inner glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Welcome back to KinetiQ</span>
            </div>
            <h1
              className="text-glow-blue font-heading text-3xl font-bold tracking-wide text-white sm:text-4xl"
              style={{ fontFamily: "'PP Monument Extended', sans-serif" }}
            >
              SIGN IN
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Sign in to manage your projects and continue your creative flow.
            </p>
          </div>

          {/* Server error banner */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{serverError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <div className="group relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition group-focus-within:text-blue-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@kinetiq.com"
                  autoComplete="email"
                  {...register("email")}
                  className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-blue-400/60 focus-visible:ring-blue-400/30"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 transition hover:text-blue-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition group-focus-within:text-blue-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  className="border-white/10 bg-white/5 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:border-blue-400/60 focus-visible:ring-blue-400/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2 pt-1">
              <Checkbox
                id="remember"
                checked={!!rememberValue}
                onCheckedChange={(checked) =>
                  setValue("remember", Boolean(checked))
                }
                className="border-white/20 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
              />
              <Label
                htmlFor="remember"
                className="cursor-pointer text-sm font-normal text-white/70"
              >
                Remember me on this device
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="group relative h-11 w-full overflow-hidden rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-sm font-semibold tracking-wide text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-400 hover:to-indigo-400 disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-transform duration-500 group-hover:translate-x-0" />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              or
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Demo Login */}
          <Button
            type="button"
            variant="outline"
            onClick={handleDemoFill}
            disabled={isSubmitting}
            className="group h-11 w-full rounded-md border-white/15 bg-white/5 text-sm font-medium text-white/80 backdrop-blur transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white disabled:opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400 transition group-hover:rotate-12 group-hover:text-blue-300" />
              Try Demo Login
            </span>
          </Button>
          <p className="mt-3 text-center text-[11px] text-white/40">
            Fills the form with the seeded admin credentials. Click&nbsp;
            <span className="font-medium text-white/70">Sign In</span>&nbsp;to
            continue.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;