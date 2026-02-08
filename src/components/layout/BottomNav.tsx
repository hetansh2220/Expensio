"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineBanknotes,
  HiOutlinePlus,
  HiOutlineTrophy,
  HiOutlineBars3,
  HiOutlineChartPie,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineCog6Tooth,
  HiOutlineXMark,
} from "react-icons/hi2";
import clsx from "clsx";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

const mainTabs = [
  { href: ROUTES.DASHBOARD, icon: HiOutlineSquares2X2, label: "Home", color: "primary" },
  { href: ROUTES.TRANSACTIONS, icon: HiOutlineBanknotes, label: "Money", color: "savings" },
  { href: ROUTES.ADD_TRANSACTION, icon: HiOutlinePlus, label: "Add", isFab: true },
  { href: ROUTES.CHALLENGES, icon: HiOutlineTrophy, label: "Goals", color: "accent" },
  { href: "__more__", icon: HiOutlineBars3, label: "More", color: "muted" },
];

const moreItems = [
  { href: ROUTES.BUDGET, label: "Budget", icon: HiOutlineChartPie, color: "needs" },
  { href: ROUTES.BILLS, label: "Bills & EMI", icon: HiOutlineDocumentText, color: "emi" },
  { href: ROUTES.ASSISTANT, label: "AI Assistant", icon: HiOutlineSparkles, color: "primary" },
  { href: ROUTES.LEARN, label: "Learn", icon: HiOutlineAcademicCap, color: "savings" },
  { href: ROUTES.SETTINGS, label: "Settings", icon: HiOutlineCog6Tooth, color: "muted" },
];

const colorClasses: Record<string, { active: string; icon: string }> = {
  primary: { active: "text-primary", icon: "text-primary bg-primary/10" },
  savings: { active: "text-savings", icon: "text-savings bg-savings/10" },
  accent: { active: "text-accent", icon: "text-accent bg-accent/10" },
  needs: { active: "text-needs", icon: "text-needs bg-needs/10" },
  emi: { active: "text-emi", icon: "text-emi bg-emi/10" },
  muted: { active: "text-primary", icon: "text-muted bg-surface-overlay" },
};

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {showMore && (
        <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={() => setShowMore(false)}>
          <div 
            className="absolute bottom-20 left-3 right-3 bg-surface border border-border-subtle rounded-3xl p-2 shadow-2xl shadow-black/20"
            style={{ animation: "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 mb-1">
              <span className="text-xs font-semibold text-muted uppercase tracking-widest">Quick Access</span>
              <button 
                onClick={() => setShowMore(false)}
                className="w-7 h-7 rounded-full bg-surface-overlay flex items-center justify-center text-muted hover:text-foreground transition-colors"
              >
                <HiOutlineXMark className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 px-1">
              {moreItems.map((item) => {
                const active = pathname.startsWith(item.href);
                const colors = colorClasses[item.color];
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setShowMore(false);
                    }}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all active:scale-95",
                      active
                        ? `${colors.active} bg-surface-raised`
                        : "text-foreground hover:bg-surface-overlay"
                    )}
                  >
                    <div className={clsx(
                      "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                      active ? colors.icon : "bg-surface-overlay"
                    )}>
                      <item.icon className={clsx(
                        "w-5 h-5",
                        active ? colors.active : "text-muted"
                      )} />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="mx-3 mb-3">
          <div className="bg-surface/90 backdrop-blur-xl border border-border-subtle/50 rounded-2xl shadow-lg shadow-black/10">
            <div className="flex items-center justify-around px-1 h-16 max-w-lg mx-auto">
              {mainTabs.map((tab) => {
                if (tab.isFab) {
                  return (
                    <Link
                      key="fab"
                      href={tab.href}
                      className="relative -mt-6 group"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary to-savings opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
                      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-savings shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                        <HiOutlinePlus className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </div>
                    </Link>
                  );
                }

                const active = tab.href === "__more__" ? showMore : isActive(tab.href);
                const colors = colorClasses[tab.color || "primary"];

                return (
                  <button
                    key={tab.href}
                    onClick={() => {
                      if (tab.href === "__more__") {
                        setShowMore(!showMore);
                      } else {
                        setShowMore(false);
                        router.push(tab.href);
                      }
                    }}
                    className={clsx(
                      "relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all active:scale-95",
                      active ? colors.active : "text-muted"
                    )}
                  >
                    <div className={clsx(
                      "flex items-center justify-center w-8 h-8 rounded-xl transition-all",
                      active ? "bg-current/10" : ""
                    )}>
                      <tab.icon className={clsx(
                        "w-5 h-5 transition-transform",
                        active && "scale-110"
                      )} />
                    </div>
                    <span className={clsx(
                      "text-[10px] font-semibold tracking-wide transition-all",
                      active ? "opacity-100" : "opacity-70"
                    )}>
                      {tab.label}
                    </span>
                    {active && (
                      <div className="absolute bottom-0 w-5 h-1 rounded-full bg-current" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
