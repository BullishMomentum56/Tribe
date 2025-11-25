// app/page.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Zap, DollarSign, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black">
      {/* Hero */}
      <section className="px-6 pt-20 pb-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <Sparkles className="w-4 h-4" />
              Launching December 2025 — First 100 creators get lifetime 0% fees
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              The Whop Killer Is Here
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Keep <span className="font-bold text-purple-600">98–100% of everything you earn</span>. 
              Beautiful communities, courses, real-time chat, files, events — all in one link.
            </p>
            <p className="mt-4 text-lg text-gray-500 line-through">
              No more 30% marketplace cuts. Ever.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-10 bg-purple-600 hover:bg-purple-700" asChild>
                <a href="https://tribe.waitlist.so" target="_blank">Join the Waitlist →</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-24 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              { icon: DollarSign, title: "You keep almost everything", desc: "Only 1–2% + processing. Zero marketplace tax." },
              { icon: Zap, title: "Better than Discord", desc: "Blazing-fast native chat, threads, reactions, mentions, search." },
              { icon: Users, title: "Everything creators actually need", desc: "Courses, files, events, paywalls, trials — one beautiful hub." }
            ].map((f, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex p-5 bg-purple-100 dark:bg-purple-900/30 rounded-3xl mb-6">
                  <f.icon className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

      {/* Footer */}
      <footer className="px-6 py-16 text-center text-gray-500">
        <p>Made with fire by a broke founder who got sick of 30% fees</p>
      </footer>
    </div>
  );
}
