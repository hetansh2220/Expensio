"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { ROUTES } from "@/lib/constants/routes";
import {
  HiOutlineSquares2X2,
  HiOutlineBanknotes,
  HiOutlinePlus,
  HiOutlineTrophy,
  HiOutlineChartPie,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineCog6Tooth,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import clsx from "clsx";

const navItems = [
  { href: ROUTES.DASHBOARD, icon: HiOutlineSquares2X2, label: "Dashboard", color: "primary" },
  { href: ROUTES.TRANSACTIONS, icon: HiOutlineBanknotes, label: "Transactions", color: "savings" },
  { href: ROUTES.BUDGET, icon: HiOutlineChartPie, label: "Budget", color: "needs" },
  { href: ROUTES.BILLS, icon: HiOutlineDocumentText, label: "Bills & EMI", color: "emi" },
  { href: ROUTES.CHALLENGES, icon: HiOutlineTrophy, label: "Challenges", color: "accent" },
  { href: ROUTES.ASSISTANT, icon: HiOutlineSparkles, label: "AI Assistant", color: "primary" },
  { href: ROUTES.LEARN, icon: HiOutlineAcademicCap, label: "Learn", color: "savings" },
];

const colorMap: Record<string, string> = {
  primary: "text-primary bg-primary/10",
  savings: "text-savings bg-savings/10",
  needs: "text-needs bg-needs/10",
  emi: "text-emi bg-emi/10",
  accent: "text-accent bg-accent/10",
};

const iconColorMap: Record<string, string> = {
  primary: "text-primary",
  savings: "text-savings",
  needs: "text-needs",
  emi: "text-emi",
  accent: "text-accent",
};

export default function Sidebar() {
  const pathname = usePathname();
  const { profile, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const name = profile?.displayName || user?.displayName || "User";
  const initial = name.charAt(0).toUpperCase();

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-surface/80 backdrop-blur-xl border-r border-border-subtle/50 z-40">
      {/* Logo Section */}
      <div className="px-6 py-5">
        <div className="flex items-center flex-col gap-3 group">
          
            
          
            <h1 className="text-3xl font-bold text-center w-full -ml-10 text-foreground tracking-tight">Expensio</h1>
            <p className="text-[10px] text-muted font-medium -ml-10 uppercase tracking-widest">Finteah</p>

      
        </div>
      </div>

      {/* Add Transaction CTA */}
      

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                active
                  ? colorMap[item.color]
                  : "text-muted hover:text-foreground hover:bg-surface-overlay"
              )}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-current" />
              )}
              
              {/* Icon with background */}
              <div className={clsx(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
                active 
                  ? "bg-current/10" 
                  : "bg-surface-raised group-hover:bg-surface-overlay"
              )}>
                <item.icon className={clsx(
                  "w-[18px] h-[18px] transition-colors",
                  active ? iconColorMap[item.color] : "text-muted group-hover:text-foreground"
                )} />
              </div>
              
              <span className="flex-1">{item.label}</span>
              
              {/* Hover arrow */}
              <HiOutlineArrowRightOnRectangle className={clsx(
                "w-4 h-4 opacity-0 -translate-x-2 transition-all",
                active ? "hidden" : "group-hover:opacity-50 group-hover:translate-x-0"
              )} />
            </Link>
          );
        })}
      </nav>

      {/* <div className="px-4 mb-2">
        <Link
          href={ROUTES.ADD_TRANSACTION}
          className="group relative flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl overflow-hidden text-white text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary via-savings to-primary bg-size-[200%_100%] group-hover:animate-shimmer" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-r from-primary/20 to-savings/20 blur-xl" />
          <HiOutlinePlus className="relative w-5 h-5" strokeWidth={2.5} />
          <span className="relative">New Transaction</span>
        </Link>
      </div> */}

      {/* Bottom Section */}
      <div className="px-3 py-3 border-t border-border-subtle/50 space-y-1">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="group flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[13px] font-medium text-muted hover:text-foreground hover:bg-surface-overlay transition-all"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-raised group-hover:bg-surface-overlay transition-all">
            {theme === "dark" ? (
              <HiOutlineSun className="w-[18px] h-[18px] text-accent" />
            ) : (
              <HiOutlineMoon className="w-[18px] h-[18px] text-needs" />
            )}
          </div>
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          <div className="ml-auto w-9 h-5 rounded-full bg-surface-overlay p-0.5 transition-colors">
            <div className={clsx(
              "w-4 h-4 rounded-full transition-all duration-300",
              theme === "dark" 
                ? "translate-x-4 bg-accent" 
                : "translate-x-0 bg-muted"
            )} />
          </div>
        </button>

        {/* Settings */}
        <Link
          href={ROUTES.SETTINGS}
          className={clsx(
            "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all",
            pathname === ROUTES.SETTINGS
              ? "bg-primary/10 text-primary"
              : "text-muted hover:text-foreground hover:bg-surface-overlay"
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-raised group-hover:bg-surface-overlay transition-all">
            <HiOutlineCog6Tooth className={clsx(
              "w-[18px] h-[18px] transition-colors",
              pathname === ROUTES.SETTINGS ? "text-primary" : "text-muted group-hover:text-foreground"
            )} />
          </div>
          <span>Settings</span>
        </Link>

       
     
      </div>
    </aside>
  );
}
