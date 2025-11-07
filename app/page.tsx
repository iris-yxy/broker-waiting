// app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


import {
  SplitSquareHorizontal,
  Users,
  Cog,
  CheckCircle2,
} from "lucide-react";

export default function Page() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // basic client-side validation
    const required = ["fullName", "email", "company", "role", "teamSize"];
    const nextErrors: Record<string, string> = {};
    required.forEach((k) => {
      if (!form.get(k)) nextErrors[k] = "Required";
    });
    const email = String(form.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Invalid email";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // analytics (optional)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "waitlist_submit",
      teamSize: form.get("teamSize"),
    });

    try {
      setSubmitting(true);
      await fetch("https://formspree.io/f/manlrkrz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
      });
setSubmitted(true);
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* ===== Nav ===== */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600" />
            <span className="text-base font-semibold">Broker AI</span>
          </div>
          <nav className="hidden gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="#how"
              className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
            >
              How it works
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
            >
              FAQ
            </a>
          </nav>
          <a href="#waitlist">
            <Button
              size="sm"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700"
            >
              Join waitlist
            </Button>
          </a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(180deg,rgba(0,0,0,0.7),transparent)]">
          <div className="absolute -top-24 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-3xl bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 blur-3xl opacity-70" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-indigo-300 bg-indigo-100/50 px-4 py-1 text-xs font-semibold text-indigo-700 backdrop-blur-sm">
              For Finance Brokers · English only
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              Broker AI Waitlist
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              Commission clarity. Stickier clients. Simpler growth — without
              changing your CRM.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#waitlist">
                <Button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700">
                  Join waitlist
                </Button>
              </a>
              <a
                href="#features"
                className="text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-800"
              >
                See features
              </a>
            </div>

            {/* quick highlights */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Commission split", "Multi-tier share"],
                ["Engagement agent", "Your tone of voice"],
                ["Zero migration", "Keep your CRM"],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm"
                >
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-slate-600">{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <Card
            id="waitlist"
            className="rounded-2xl border border-border/60 bg-white shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-indigo-700">
                Request early access
              </CardTitle>
              <CardDescription>
                Leave your info to get invited and receive updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-3 inline-flex rounded-full border border-indigo-300 bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
                    Submitted
                  </div>
                  <p className="text-xl font-semibold">Thanks! We’ll be in touch.</p>
                  <p className="mt-2 text-sm text-slate-600">You’re on the list.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="fullName"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Full name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        aria-invalid={!!errors.fullName}
                        className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Work email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                        className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="company"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Company *
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        aria-invalid={!!errors.company}
                        className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.company}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="role"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Role *
                      </Label>
                      <Input
                        id="role"
                        name="role"
                        aria-invalid={!!errors.role}
                        className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.role && (
                        <p className="mt-1 text-xs text-red-600">{errors.role}</p>
                      )}
                    </div>
                  </div>

                  {/* Team size */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-slate-800">
                      Team size *
                    </legend>
                    {errors.teamSize && (
                      <p className="text-xs text-red-600">{errors.teamSize}</p>
                    )}
                    <div className="grid gap-3">
                      {[
                        { value: "1-10", label: "1–10 people" },
                        { value: "10-50", label: "10–50 people" },
                        { value: "50+", label: "50+ people" },
                      ].map(({ value, label }) => (
                        <label
                          key={value}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/60 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-100"
                        >
                          <input
                            type="radio"
                            name="teamSize"
                            value={value}
                            className="h-5 w-5 cursor-pointer rounded-full border border-indigo-400 bg-white checked:border-indigo-600 checked:bg-indigo-600"
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="crm"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Current CRM (optional)
                      </Label>
                      <Input
                        id="crm"
                        name="crm"
                        placeholder="Mercury / Salestrekker / Other"
                        className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="priceBand"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Willing to pay (optional)
                      </Label>
                      <Input
                        id="priceBand"
                        name="priceBand"
                        placeholder="e.g. under AUD 300 / mo"
                        className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="notes"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Notes (optional)
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Anything else you need"
                      className="rounded-xl border border-border/60 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="consent"
                      defaultChecked
                      className="h-4 w-4 rounded border border-indigo-400 bg-white checked:border-indigo-600 checked:bg-indigo-600"
                    />
                    I agree to receive early access updates. (Unsubscribe
                    anytime)
                  </label>

                  <Button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Join waitlist"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section
        id="features"
        className="border-t border-border/60 bg-gradient-to-b from-white via-indigo-50 to-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Core capabilities
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-slate-700">
            Reduce manual reconciliation, and increase client retention with a focused set of tools.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Commission split automation",
                desc: "Import monthly statements, auto-reconcile and highlight anomalies.",
                Icon: SplitSquareHorizontal,
              },
              {
                title: "Engagement agent",
                desc: "Personalized touchpoints (anniversaries, refi signals) in your tone.",
                Icon: Users,
              },
              {
                title: "Zero CRM migration",
                desc: "Use it alongside your existing CRM, no process disruption.",
                Icon: Cog,
              },
            ].map(({ title, desc, Icon }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border/60 bg-white p-8 shadow-lg transition hover:shadow-xl"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section
        id="how"
        className="border-t border-border/60 bg-gradient-to-b from-indigo-50 via-white to-indigo-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [
                "STEP 1 · Onboarding",
                "Define roles, permissions, and revenue share rules.",
              ],
              [
                "STEP 2 · Import",
                "Upload monthly commission statements and basic client data.",
              ],
              [
                "STEP 3 · Engage",
                "Agent schedules follow-ups and surfaces referral opportunities.",
              ],
            ].map(([title, desc]) => (
              <div
                key={String(title)}
                className="rounded-2xl border border-border/60 bg-white p-8 shadow-lg"
              >
                <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {title}
                </div>
                <p className="text-slate-700">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-14 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="text-lg font-semibold">
                  Ready to see Broker AI in action?
                </div>
                <div className="text-sm opacity-90">
                  Join the waitlist — we’ll invite you to early access.
                </div>
              </div>
              <a href="#waitlist">
                <Button
                  variant="secondary"
                  className="rounded-xl bg-white text-indigo-700 hover:bg-slate-100"
                >
                  Join waitlist
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        id="faq"
        className="border-t border-border/60 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-extrabold text-slate-900">FAQ</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              [
                "Do I need to replace my CRM?",
                "No. Broker AI works alongside your existing CRM — you only import monthly commission statements and basic client data.",
              ],
              [
                "Is my data secure?",
                "We follow least-privilege and encrypted transport best practices. A formal privacy policy will be linked before GA.",
              ],
              [
                "What formats are supported?",
                "Common CSV/XLSX statements are supported; a custom mapping step can be added during onboarding.",
              ],
              [
                "How does the agent match my tone?",
                "A one-time style setup and examples help the agent personalize outreach while sounding like you.",
              ],
            ].map(([q, a]) => (
              <div
                key={String(q)}
                className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm"
              >
                <div className="text-base font-semibold">{q}</div>
                <div className="mt-2 text-slate-700">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border/60 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600" />
              <span className="text-base font-semibold">Broker AI</span>
            </div>
            <p className="max-w-sm text-sm text-slate-600">
              Commission clarity. Stickier clients. Simpler growth. Join the early access list.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a className="underline underline-offset-4" href="#features">Features</a></li>
              <li><a className="underline underline-offset-4" href="#how">How it works</a></li>
              <li><a className="underline underline-offset-4" href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a className="underline underline-offset-4" href="#" aria-disabled>Privacy</a></li>
              <li><a className="underline underline-offset-4" href="#" aria-disabled>Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Broker AI</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}